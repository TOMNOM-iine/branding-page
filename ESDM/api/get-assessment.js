// Vercel Edge Function for retrieving assessment data from Neon DB
import { neon } from '@neondatabase/serverless';

export const config = {
  runtime: 'edge',
};

export default async function handler(request) {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  };

  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers });
  }

  if (request.method !== 'GET') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { status: 405, headers }
    );
  }

  try {
    // Get assessment ID from query params
    const url = new URL(request.url);
    const assessmentId = url.searchParams.get('id');
    
    if (!assessmentId) {
      return new Response(
        JSON.stringify({ error: 'Assessment ID required' }),
        { status: 400, headers }
      );
    }
    
    // Get database connection
    const sql = neon(process.env.DATABASE_URL);
    
    // Fetch assessment data
    const [assessment] = await sql`
      SELECT * FROM assessments WHERE id = ${assessmentId}
    `;
    
    if (!assessment) {
      return new Response(
        JSON.stringify({ error: 'Assessment not found' }),
        { status: 404, headers }
      );
    }
    
    // Fetch related data
    const priorities = await sql`
      SELECT * FROM priorities 
      WHERE assessment_id = ${assessmentId}
      ORDER BY priority_level
    `;
    
    const routines = await sql`
      SELECT * FROM daily_routines
      WHERE assessment_id = ${assessmentId}
    `;
    
    const skills = await sql`
      SELECT * FROM skills
      WHERE assessment_id = ${assessmentId}
    `;
    
    const [supportPlan] = await sql`
      SELECT * FROM support_plans
      WHERE assessment_id = ${assessmentId}
    `;
    
    // Format response
    const formData = {
      basicInfo: {
        'child-name': assessment.child_name,
        'birth-date': assessment.birth_date,
        'assessment-date': assessment.assessment_date,
        'attendees': assessment.attendees,
        'language': assessment.language
      },
      priorities: {
        'priority-1': priorities[0]?.content || '',
        'priority-2': priorities[1]?.content || '',
        'priority-3': priorities[2]?.content || ''
      },
      dailyRoutine: {
        checkboxes: {},
        notes: {},
        other: {}
      },
      assessment: {},
      behavior: {},
      supportPlan: {
        goals: supportPlan?.goals || [],
        practiceTime: supportPlan?.practice_times || {},
        supportFormat: supportPlan?.support_formats || {},
        nextAssessment: supportPlan?.next_assessment || '',
        additionalNotes: supportPlan?.additional_notes || ''
      }
    };
    
    // Process routines
    routines.forEach(routine => {
      if (routine.value !== null) {
        formData.dailyRoutine.checkboxes[routine.item_key] = routine.value;
      }
      if (routine.notes) {
        formData.dailyRoutine.notes[routine.item_key] = routine.notes;
      }
    });
    
    // Process skills
    skills.forEach(skill => {
      if (!formData.assessment[skill.category]) {
        formData.assessment[skill.category] = {};
      }
      formData.assessment[skill.category][skill.skill_name] = skill.score.toString();
    });
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        data: formData
      }),
      { status: 200, headers }
    );
    
  } catch (error) {
    console.error('Database error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Failed to retrieve assessment',
        details: error.message 
      }),
      { status: 500, headers }
    );
  }
}
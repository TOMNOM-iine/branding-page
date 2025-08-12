// Vercel Edge Function for saving assessment data to Neon DB
import { neon } from '@neondatabase/serverless';

export const config = {
  runtime: 'edge',
};

export default async function handler(request) {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  };

  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers });
  }

  if (request.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { status: 405, headers }
    );
  }

  try {
    // Get database connection
    const sql = neon(process.env.DATABASE_URL);
    
    // Parse request body
    const data = await request.json();
    
    // Start transaction
    const result = await sql.transaction(async (tx) => {
      // Insert main assessment
      const [assessment] = await tx`
        INSERT INTO assessments (
          child_name, birth_date, assessment_date, 
          attendees, language
        ) VALUES (
          ${data.basicInfo['child-name']},
          ${data.basicInfo['birth-date']},
          ${data.basicInfo['assessment-date']},
          ${data.basicInfo.attendees},
          ${data.basicInfo.language}
        )
        RETURNING id
      `;
      
      const assessmentId = assessment.id;
      
      // Insert priorities
      const priorities = [
        data.priorities['priority-1'],
        data.priorities['priority-2'],
        data.priorities['priority-3']
      ].filter(Boolean);
      
      for (let i = 0; i < priorities.length; i++) {
        await tx`
          INSERT INTO priorities (assessment_id, priority_level, content)
          VALUES (${assessmentId}, ${i + 1}, ${priorities[i]})
        `;
      }
      
      // Insert daily routines
      for (const [key, value] of Object.entries(data.dailyRoutine.checkboxes)) {
        const [category, item] = key.split('-');
        await tx`
          INSERT INTO daily_routines (assessment_id, category, item_key, value)
          VALUES (${assessmentId}, ${category}, ${key}, ${value})
        `;
      }
      
      // Insert routine notes
      for (const [key, value] of Object.entries(data.dailyRoutine.notes)) {
        if (value) {
          const [category] = key.split('-');
          await tx`
            INSERT INTO daily_routines (assessment_id, category, item_key, notes)
            VALUES (${assessmentId}, ${category}, ${key}, ${value})
          `;
        }
      }
      
      // Insert skills assessment
      for (const [category, skills] of Object.entries(data.assessment)) {
        for (const [skillName, score] of Object.entries(skills)) {
          await tx`
            INSERT INTO skills (assessment_id, category, skill_name, score)
            VALUES (${assessmentId}, ${category}, ${skillName}, ${parseInt(score)})
          `;
        }
      }
      
      // Insert support plan
      await tx`
        INSERT INTO support_plans (
          assessment_id, goals, practice_times, 
          support_formats, next_assessment, additional_notes
        )
        VALUES (
          ${assessmentId},
          ${JSON.stringify(data.supportPlan.goals)},
          ${JSON.stringify(data.supportPlan.practiceTime)},
          ${JSON.stringify(data.supportPlan.supportFormat)},
          ${data.supportPlan.nextAssessment || null},
          ${data.supportPlan.additionalNotes || null}
        )
      `;
      
      return { assessmentId };
    });
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        assessmentId: result.assessmentId,
        message: 'Assessment saved successfully'
      }),
      { status: 200, headers }
    );
    
  } catch (error) {
    console.error('Database error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Failed to save assessment',
        details: error.message 
      }),
      { status: 500, headers }
    );
  }
}
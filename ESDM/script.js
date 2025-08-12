// Set today's date as default for assessment date
document.addEventListener('DOMContentLoaded', function() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('assessment-date').value = today;
    
    // Load saved progress if exists
    loadProgress();
    
    // Add navigation click handlers
    setupNavigation();
    
    // Add auto-save on input changes
    setupAutoSave();
});

// Navigation setup
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            // Add active class to clicked link
            this.classList.add('active');
            
            // Smooth scroll to section
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// Auto-save setup
function setupAutoSave() {
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('change', function() {
            saveProgress();
        });
    });
}

// Goal management
let goalCount = 3;
function addGoal() {
    goalCount++;
    const goalsContainer = document.getElementById('goals-container');
    const newGoal = document.createElement('div');
    newGoal.className = 'goal-item';
    newGoal.innerHTML = `
        <input type="checkbox" id="goal-${goalCount}-check">
        <input type="text" class="goal-input" id="goal-${goalCount}" placeholder="目標${goalCount}を入力">
    `;
    goalsContainer.appendChild(newGoal);
    
    // Add event listener to new input
    newGoal.querySelector('input[type="text"]').addEventListener('change', saveProgress);
}

// Save progress to localStorage
async function saveProgress() {
    const formData = collectFormData();
    localStorage.setItem('esdm_assessment', JSON.stringify(formData));
    
    // Try to save to database if API is available
    if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
        try {
            const response = await fetch('/api/save-assessment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            
            if (response.ok) {
                const result = await response.json();
                localStorage.setItem('esdm_assessment_id', result.assessmentId);
                showNotification('データベースに保存しました');
            } else {
                showNotification('ローカルに保存しました');
            }
        } catch (error) {
            console.log('API not available, saved locally');
            showNotification('進捗を保存しました');
        }
    } else {
        // Show save confirmation
        showNotification('進捗を保存しました');
    }
}

// Load progress from localStorage
function loadProgress() {
    const savedData = localStorage.getItem('esdm_assessment');
    if (savedData) {
        const formData = JSON.parse(savedData);
        
        // Load text inputs
        Object.keys(formData.basicInfo).forEach(key => {
            const element = document.getElementById(key);
            if (element) element.value = formData.basicInfo[key];
        });
        
        // Load priorities
        Object.keys(formData.priorities).forEach(key => {
            const element = document.getElementById(key);
            if (element) element.value = formData.priorities[key];
        });
        
        // Load routine checkboxes
        Object.keys(formData.dailyRoutine.checkboxes).forEach(key => {
            const element = document.getElementById(key);
            if (element) element.checked = formData.dailyRoutine.checkboxes[key];
        });
        
        // Load routine notes
        Object.keys(formData.dailyRoutine.notes).forEach(key => {
            const element = document.getElementById(key);
            if (element) element.value = formData.dailyRoutine.notes[key];
        });
        
        // Load other text areas
        Object.keys(formData.dailyRoutine.other).forEach(key => {
            const element = document.getElementById(key);
            if (element) element.value = formData.dailyRoutine.other[key];
        });
        
        // Load assessment radio buttons
        Object.keys(formData.assessment).forEach(category => {
            Object.keys(formData.assessment[category]).forEach(skill => {
                const radios = document.getElementsByName(skill);
                radios.forEach(radio => {
                    if (radio.value === formData.assessment[category][skill]) {
                        radio.checked = true;
                    }
                });
            });
        });
        
        // Load behavior notes
        Object.keys(formData.behavior).forEach(key => {
            const element = document.getElementById(key);
            if (element) element.value = formData.behavior[key];
        });
        
        // Load support plan
        if (formData.supportPlan.goals) {
            formData.supportPlan.goals.forEach((goal, index) => {
                const goalInput = document.getElementById(`goal-${index + 1}`);
                const goalCheck = document.getElementById(`goal-${index + 1}-check`);
                if (goalInput) goalInput.value = goal.text;
                if (goalCheck) goalCheck.checked = goal.checked;
                
                // Add extra goals if needed
                if (index >= 3) {
                    addGoal();
                    const newGoalInput = document.getElementById(`goal-${index + 1}`);
                    const newGoalCheck = document.getElementById(`goal-${index + 1}-check`);
                    if (newGoalInput) newGoalInput.value = goal.text;
                    if (newGoalCheck) newGoalCheck.checked = goal.checked;
                }
            });
        }
        
        // Load practice times
        Object.keys(formData.supportPlan.practiceTime).forEach(key => {
            const element = document.getElementById(key);
            if (element) element.checked = formData.supportPlan.practiceTime[key];
        });
        
        // Load support format
        Object.keys(formData.supportPlan.supportFormat).forEach(key => {
            const element = document.getElementById(key);
            if (element) element.checked = formData.supportPlan.supportFormat[key];
        });
        
        // Load other support plan fields
        if (formData.supportPlan.nextAssessment) {
            document.getElementById('next-assessment').value = formData.supportPlan.nextAssessment;
        }
        if (formData.supportPlan.additionalNotes) {
            document.getElementById('additional-notes').value = formData.supportPlan.additionalNotes;
        }
        
        showNotification('保存されたデータを読み込みました');
    }
}

// Collect all form data
function collectFormData() {
    const data = {
        basicInfo: {
            'child-name': document.getElementById('child-name').value,
            'birth-date': document.getElementById('birth-date').value,
            'assessment-date': document.getElementById('assessment-date').value,
            'attendees': document.getElementById('attendees').value,
            'language': document.getElementById('language').value
        },
        priorities: {
            'priority-1': document.getElementById('priority-1').value,
            'priority-2': document.getElementById('priority-2').value,
            'priority-3': document.getElementById('priority-3').value
        },
        dailyRoutine: {
            checkboxes: {
                'meal-spoon': document.getElementById('meal-spoon').checked,
                'meal-sit': document.getElementById('meal-sit').checked,
                'meal-variety': document.getElementById('meal-variety').checked,
                'sleep-regular': document.getElementById('sleep-regular').checked,
                'sleep-alone': document.getElementById('sleep-alone').checked,
                'sleep-through': document.getElementById('sleep-through').checked,
                'dress-cooperate': document.getElementById('dress-cooperate').checked,
                'dress-simple': document.getElementById('dress-simple').checked,
                'dress-choose': document.getElementById('dress-choose').checked,
                'toilet-signal': document.getElementById('toilet-signal').checked,
                'toilet-use': document.getElementById('toilet-use').checked,
                'toilet-wash': document.getElementById('toilet-wash').checked
            },
            notes: {
                'meal-notes': document.getElementById('meal-notes').value,
                'sleep-notes': document.getElementById('sleep-notes').value,
                'dress-notes': document.getElementById('dress-notes').value,
                'toilet-notes': document.getElementById('toilet-notes').value
            },
            other: {
                'favorite-activities': document.getElementById('favorite-activities').value,
                'dislikes': document.getElementById('dislikes').value
            }
        },
        assessment: {
            expressive: {},
            receptive: {},
            social: {},
            imitation: {},
            cognitive: {},
            motor: {}
        },
        behavior: {
            'repetitive-behavior': document.getElementById('repetitive-behavior').value,
            'sensory-features': document.getElementById('sensory-features').value,
            'calming-methods': document.getElementById('calming-methods').value
        },
        supportPlan: {
            goals: [],
            practiceTime: {
                'practice-morning': document.getElementById('practice-morning').checked,
                'practice-afternoon': document.getElementById('practice-afternoon').checked,
                'practice-evening': document.getElementById('practice-evening').checked,
                'practice-bedtime': document.getElementById('practice-bedtime').checked
            },
            supportFormat: {
                'support-home': document.getElementById('support-home').checked,
                'support-clinic': document.getElementById('support-clinic').checked,
                'support-online': document.getElementById('support-online').checked
            },
            nextAssessment: document.getElementById('next-assessment').value,
            additionalNotes: document.getElementById('additional-notes').value
        }
    };
    
    // Collect assessment radio button values
    const assessmentSkills = {
        expressive: ['point-want', 'verbal-request', 'refuse', 'two-words'],
        receptive: ['name-response', 'give-understand', 'follow-instruction', 'object-names'],
        social: ['eye-contact', 'shared-laugh', 'turn-taking', 'pretend-play'],
        imitation: ['hand-imitation', 'sound-imitation', 'toy-imitation', 'facial-imitation'],
        cognitive: ['toy-function', 'sort-shapes', 'puzzle', 'cause-effect'],
        motor: ['run', 'jump', 'ball-play', 'pinch']
    };
    
    Object.keys(assessmentSkills).forEach(category => {
        assessmentSkills[category].forEach(skill => {
            const selected = document.querySelector(`input[name="${skill}"]:checked`);
            if (selected) {
                data.assessment[category][skill] = selected.value;
            }
        });
    });
    
    // Collect goals
    const goalInputs = document.querySelectorAll('.goal-input');
    goalInputs.forEach((input, index) => {
        const checkboxId = `goal-${index + 1}-check`;
        const checkbox = document.getElementById(checkboxId);
        if (input.value) {
            data.supportPlan.goals.push({
                text: input.value,
                checked: checkbox ? checkbox.checked : false
            });
        }
    });
    
    return data;
}

// Export to Markdown
function exportToMarkdown() {
    const data = collectFormData();
    let markdown = '# ESDM 評価記録\n\n';
    
    // Add generation date
    markdown += `生成日: ${new Date().toLocaleDateString('ja-JP')}\n\n`;
    
    // Basic Information
    markdown += '## 基本情報\n\n';
    markdown += `- **お子さんのお名前**: ${data.basicInfo['child-name']}\n`;
    markdown += `- **生年月日**: ${data.basicInfo['birth-date']}\n`;
    markdown += `- **評価日**: ${data.basicInfo['assessment-date']}\n`;
    markdown += `- **同席者**: ${data.basicInfo['attendees']}\n`;
    markdown += `- **使用言語**: ${data.basicInfo['language']}\n\n`;
    
    // Calculate age
    if (data.basicInfo['birth-date'] && data.basicInfo['assessment-date']) {
        const birth = new Date(data.basicInfo['birth-date']);
        const assessment = new Date(data.basicInfo['assessment-date']);
        const ageInMonths = Math.floor((assessment - birth) / (1000 * 60 * 60 * 24 * 30.44));
        markdown += `- **評価時月齢**: ${ageInMonths}か月\n\n`;
    }
    
    // Priorities
    markdown += '## ご家族の優先事項\n\n';
    if (data.priorities['priority-1']) {
        markdown += `1. **最優先**: ${data.priorities['priority-1']}\n`;
    }
    if (data.priorities['priority-2']) {
        markdown += `2. ${data.priorities['priority-2']}\n`;
    }
    if (data.priorities['priority-3']) {
        markdown += `3. ${data.priorities['priority-3']}\n`;
    }
    markdown += '\n';
    
    // Daily Routine
    markdown += '## 日常生活の様子\n\n';
    
    markdown += '### 食事\n';
    markdown += `- スプーンやフォークを使える: ${data.dailyRoutine.checkboxes['meal-spoon'] ? '✓' : '−'}\n`;
    markdown += `- 座って食べられる: ${data.dailyRoutine.checkboxes['meal-sit'] ? '✓' : '−'}\n`;
    markdown += `- いろいろな食べ物を食べる: ${data.dailyRoutine.checkboxes['meal-variety'] ? '✓' : '−'}\n`;
    if (data.dailyRoutine.notes['meal-notes']) {
        markdown += `- 備考: ${data.dailyRoutine.notes['meal-notes']}\n`;
    }
    markdown += '\n';
    
    markdown += '### 睡眠\n';
    markdown += `- 決まった時間に寝る: ${data.dailyRoutine.checkboxes['sleep-regular'] ? '✓' : '−'}\n`;
    markdown += `- 一人で眠れる: ${data.dailyRoutine.checkboxes['sleep-alone'] ? '✓' : '−'}\n`;
    markdown += `- 朝まで起きない: ${data.dailyRoutine.checkboxes['sleep-through'] ? '✓' : '−'}\n`;
    if (data.dailyRoutine.notes['sleep-notes']) {
        markdown += `- 備考: ${data.dailyRoutine.notes['sleep-notes']}\n`;
    }
    markdown += '\n';
    
    markdown += '### 着替え\n';
    markdown += `- 着替えに協力する: ${data.dailyRoutine.checkboxes['dress-cooperate'] ? '✓' : '−'}\n`;
    markdown += `- 簡単な服を脱げる: ${data.dailyRoutine.checkboxes['dress-simple'] ? '✓' : '−'}\n`;
    markdown += `- 服を選ぶ: ${data.dailyRoutine.checkboxes['dress-choose'] ? '✓' : '−'}\n`;
    if (data.dailyRoutine.notes['dress-notes']) {
        markdown += `- 備考: ${data.dailyRoutine.notes['dress-notes']}\n`;
    }
    markdown += '\n';
    
    markdown += '### トイレ\n';
    markdown += `- トイレを教える: ${data.dailyRoutine.checkboxes['toilet-signal'] ? '✓' : '−'}\n`;
    markdown += `- トイレを使える: ${data.dailyRoutine.checkboxes['toilet-use'] ? '✓' : '−'}\n`;
    markdown += `- 手を洗う: ${data.dailyRoutine.checkboxes['toilet-wash'] ? '✓' : '−'}\n`;
    if (data.dailyRoutine.notes['toilet-notes']) {
        markdown += `- 備考: ${data.dailyRoutine.notes['toilet-notes']}\n`;
    }
    markdown += '\n';
    
    if (data.dailyRoutine.other['favorite-activities']) {
        markdown += `### 好きな遊びや活動\n${data.dailyRoutine.other['favorite-activities']}\n\n`;
    }
    
    if (data.dailyRoutine.other['dislikes']) {
        markdown += `### 苦手なこと・避けたいこと\n${data.dailyRoutine.other['dislikes']}\n\n`;
    }
    
    // Assessment
    markdown += '## 発達評価\n\n';
    
    const skillLabels = {
        'point-want': '欲しいものを指差す',
        'verbal-request': '言葉や声で要求する',
        'refuse': '「いや」「いらない」を伝える',
        'two-words': '2つ以上の言葉をつなげて話す',
        'name-response': '名前を呼ばれたら振り向く',
        'give-understand': '「ちょうだい」が分かる',
        'follow-instruction': '簡単な指示に従う',
        'object-names': '物の名前が分かる',
        'eye-contact': '目を合わせる',
        'shared-laugh': '一緒に笑う',
        'turn-taking': '順番を待つ・交代する',
        'pretend-play': 'ごっこ遊びをする',
        'hand-imitation': '手の動きをまねする',
        'sound-imitation': '音や言葉をまねする',
        'toy-imitation': 'おもちゃの使い方をまねする',
        'facial-imitation': '表情をまねする',
        'toy-function': 'おもちゃで遊ぶ方法を理解',
        'sort-shapes': '形や色を分ける',
        'puzzle': '簡単なパズルをする',
        'cause-effect': '原因と結果を理解',
        'run': '走る',
        'jump': 'ジャンプする',
        'ball-play': 'ボールを投げる・蹴る',
        'pinch': '小さなものをつまむ'
    };
    
    const categoryNames = {
        expressive: '気持ちを伝える力（表出）',
        receptive: '理解する力（受容）',
        social: '人との関わり・遊び',
        imitation: 'まねをする力',
        cognitive: '考える力・学ぶ力',
        motor: '体を動かす力'
    };
    
    const valueLabels = {
        '2': 'できる',
        '1': '時々できる',
        '0': 'まだできない'
    };
    
    Object.keys(data.assessment).forEach(category => {
        if (Object.keys(data.assessment[category]).length > 0) {
            markdown += `### ${categoryNames[category]}\n`;
            Object.keys(data.assessment[category]).forEach(skill => {
                const value = data.assessment[category][skill];
                const label = valueLabels[value] || '未評価';
                markdown += `- ${skillLabels[skill]}: **${label}**\n`;
            });
            markdown += '\n';
        }
    });
    
    // Behavior
    if (data.behavior['repetitive-behavior'] || data.behavior['sensory-features'] || data.behavior['calming-methods']) {
        markdown += '### 行動・感覚の特徴\n';
        if (data.behavior['repetitive-behavior']) {
            markdown += `- **繰り返し行動**: ${data.behavior['repetitive-behavior']}\n`;
        }
        if (data.behavior['sensory-features']) {
            markdown += `- **感覚の特徴**: ${data.behavior['sensory-features']}\n`;
        }
        if (data.behavior['calming-methods']) {
            markdown += `- **落ち着く方法**: ${data.behavior['calming-methods']}\n`;
        }
        markdown += '\n';
    }
    
    // Support Plan
    markdown += '## 支援計画\n\n';
    
    if (data.supportPlan.goals.length > 0) {
        markdown += '### 12週間の目標\n';
        data.supportPlan.goals.forEach((goal, index) => {
            const status = goal.checked ? '✓' : '○';
            markdown += `${index + 1}. [${status}] ${goal.text}\n`;
        });
        markdown += '\n';
    }
    
    // Practice times
    const practiceSchedule = [];
    if (data.supportPlan.practiceTime['practice-morning']) practiceSchedule.push('朝（5-10分）');
    if (data.supportPlan.practiceTime['practice-afternoon']) practiceSchedule.push('昼（5-10分）');
    if (data.supportPlan.practiceTime['practice-evening']) practiceSchedule.push('夕方（5-10分）');
    if (data.supportPlan.practiceTime['practice-bedtime']) practiceSchedule.push('就寝前（5-10分）');
    
    if (practiceSchedule.length > 0) {
        markdown += '### 家庭での練習時間\n';
        practiceSchedule.forEach(time => {
            markdown += `- ${time}\n`;
        });
        markdown += '\n';
    }
    
    // Support format
    const supportFormats = [];
    if (data.supportPlan.supportFormat['support-home']) supportFormats.push('家庭訪問');
    if (data.supportPlan.supportFormat['support-clinic']) supportFormats.push('通所');
    if (data.supportPlan.supportFormat['support-online']) supportFormats.push('オンライン');
    
    if (supportFormats.length > 0) {
        markdown += '### 支援の形式\n';
        supportFormats.forEach(format => {
            markdown += `- ${format}\n`;
        });
        markdown += '\n';
    }
    
    if (data.supportPlan.nextAssessment) {
        markdown += `### 次回評価予定日\n${data.supportPlan.nextAssessment}\n\n`;
    }
    
    if (data.supportPlan.additionalNotes) {
        markdown += `### 追加メモ\n${data.supportPlan.additionalNotes}\n\n`;
    }
    
    // Summary statistics
    markdown += '## 評価サマリー\n\n';
    
    const assessmentSummary = {};
    Object.keys(data.assessment).forEach(category => {
        const skills = Object.values(data.assessment[category]);
        if (skills.length > 0) {
            const counts = {
                '2': skills.filter(s => s === '2').length,
                '1': skills.filter(s => s === '1').length,
                '0': skills.filter(s => s === '0').length
            };
            assessmentSummary[category] = counts;
        }
    });
    
    markdown += '| 領域 | できる | 時々できる | まだできない | 合計 |\n';
    markdown += '|------|--------|------------|--------------|------|\n';
    
    Object.keys(assessmentSummary).forEach(category => {
        const counts = assessmentSummary[category];
        const total = counts['2'] + counts['1'] + counts['0'];
        markdown += `| ${categoryNames[category]} | ${counts['2']} | ${counts['1']} | ${counts['0']} | ${total} |\n`;
    });
    
    markdown += '\n---\n';
    markdown += '*このドキュメントはESDM評価システムによって自動生成されました*\n';
    
    // Download the file
    downloadMarkdown(markdown, data.basicInfo['child-name']);
}

// Download markdown file
function downloadMarkdown(content, childName) {
    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    
    const date = new Date().toISOString().split('T')[0];
    const filename = childName ? `ESDM評価_${childName}_${date}.md` : `ESDM評価_${date}.md`;
    
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showNotification('MDファイルをダウンロードしました');
}

// Show notification
function showNotification(message) {
    // Create notification element if it doesn't exist
    let notification = document.getElementById('notification');
    if (!notification) {
        notification = document.createElement('div');
        notification.id = 'notification';
        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: #000;
            color: white;
            padding: 12px 20px;
            border-radius: 4px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            z-index: 1000;
            font-size: 14px;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        document.body.appendChild(notification);
    }
    
    notification.textContent = message;
    notification.style.opacity = '1';
    
    setTimeout(() => {
        notification.style.opacity = '0';
    }, 3000);
}
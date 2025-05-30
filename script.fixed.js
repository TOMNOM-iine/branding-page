// ブランド管理アプリ - メインスクリプト

// ブランドデータはsimple-auth.jsで定義されているため、ここでは定義しません

// タスクフィルターの初期設定
let currentTaskFilter = 'all';

// DOMコンテンツ読み込み後の処理
document.addEventListener('DOMContentLoaded', function() {
    console.log('元のレイアウト初期化を開始します');
    
    // ブランドカードを表示
    renderBrandsOriginal();
    
    // タスク一覧を表示
    renderTasksTable();
    
    // イベントリスナーを設定
    setupEventListenersOriginal();
    
    // フィルターボタンの初期化
    initFilterButtons();
    
    console.log('元のレイアウト初期化が完了しました');
});

// ブランド一覧セクションを追加
function createBrandsSection() {
    // ブランド一覧セクションがなければ作成
    let brandsSection = document.querySelector('.brands-section');
    if (!brandsSection) {
        const mainContent = document.querySelector('main') || document.querySelector('.container');
        if (mainContent) {
            brandsSection = document.createElement('section');
            brandsSection.className = 'brands-section';
            brandsSection.innerHTML = `
                <h2 class="handwritten">ブランド一覧</h2>
                <div id="brands-container" class="brands-container"></div>
            `;
            mainContent.appendChild(brandsSection);
        }
    }
}

// オリジナルレイアウトでのブランド表示
function renderBrandsOriginal() {
    console.log('元のレイアウトでブランドデータを表示します');
    
    // ブランドセクションがなければ追加
    createBrandsSection();
    
    const container = document.getElementById('brands-container');
    if (!container) {
        console.error('ブランドコンテナが見つかりません');
        return;
    }
    
    // 既存のコンテンツをクリア
    container.innerHTML = '';
    
    // カード表示
    console.log('表示するブランド数:', brandsData.length);
    brandsData.forEach(brand => {
        try {
            const brandCard = createBrandCardOriginal(brand);
            container.appendChild(brandCard);
            console.log(`ブランドカードを追加しました: ${brand.name}`);
        } catch (error) {
            console.error(`ブランドカードの作成中にエラーが発生しました: ${brand.name}`, error);
        }
    });
}

// オリジナルレイアウトのブランドカード作成
function createBrandCardOriginal(brand) {
    const card = document.createElement('div');
    card.className = 'brand-card';
    card.id = brand.id;
    
    // ブランドヘッダー
    const header = document.createElement('div');
    header.className = 'brand-header';
    
    const nameElement = document.createElement('h3');
    nameElement.className = 'brand-name handwritten';
    nameElement.textContent = brand.name;
    
    const typeElement = document.createElement('span');
    typeElement.className = 'brand-type';
    typeElement.textContent = brand.type;
    
    header.appendChild(nameElement);
    header.appendChild(typeElement);
    
    // 編集ボタン
    const editButton = document.createElement('button');
    editButton.className = 'edit-button';
    editButton.textContent = '編集';
    editButton.dataset.brandId = brand.id;
    
    header.appendChild(editButton);
    card.appendChild(header);
    
    // ブランドグリッド（コンテンツ部分）
    const grid = document.createElement('div');
    grid.className = 'brand-grid';
    
    // エクイティセクション
    if (brand.equity) {
        const equitySection = createSection('ブランドエクイティ');
        const equityContent = document.createElement('div');
        equityContent.className = 'section-content';
        
        if (brand.equity.why) {
            equityContent.innerHTML += `<div class="equity-item"><span class="equity-label">Why:</span> ${brand.equity.why}</div>`;
        }
        if (brand.equity.who) {
            equityContent.innerHTML += `<div class="equity-item"><span class="equity-label">Who:</span> ${brand.equity.who}</div>`;
        }
        if (brand.equity.what) {
            equityContent.innerHTML += `<div class="equity-item"><span class="equity-label">What:</span> ${brand.equity.what}</div>`;
        }
        if (brand.equity.how) {
            equityContent.innerHTML += `<div class="equity-item"><span class="equity-label">How:</span> ${brand.equity.how}</div>`;
        }
        
        equitySection.appendChild(equityContent);
        grid.appendChild(equitySection);
    }
    
    // 戦略セクション
    if (brand.strategy) {
        const strategySection = createSection('マーケティング戦略');
        const strategyContent = document.createElement('div');
        strategyContent.className = 'section-content';
        
        if (brand.strategy.concept) {
            strategyContent.innerHTML += `<div class="strategy-item"><span class="strategy-label">コンセプト:</span> ${brand.strategy.concept}</div>`;
        }
        if (brand.strategy.positioning) {
            strategyContent.innerHTML += `<div class="strategy-item"><span class="strategy-label">ポジショニング:</span> ${brand.strategy.positioning}</div>`;
        }
        if (brand.strategy.uniqueValue) {
            strategyContent.innerHTML += `<div class="strategy-item"><span class="strategy-label">独自価値:</span> ${brand.strategy.uniqueValue}</div>`;
        }
        if (brand.strategy.targetAudience) {
            strategyContent.innerHTML += `<div class="strategy-item"><span class="strategy-label">対象顧客:</span> ${brand.strategy.targetAudience}</div>`;
        }
        
        strategySection.appendChild(strategyContent);
        grid.appendChild(strategySection);
    }
    
    // OKR/KPIセクション
    if (brand.okrKpi) {
        const okrSection = createSection('OKR・KPI');
        const okrContent = document.createElement('div');
        okrContent.className = 'section-content';
        
        if (brand.okrKpi.objective) {
            okrContent.innerHTML += `<div class="okr-item"><span class="okr-label">目標:</span> ${brand.okrKpi.objective}</div>`;
        }
        
        if (brand.okrKpi.keyResults && brand.okrKpi.keyResults.length > 0) {
            const krList = document.createElement('div');
            krList.className = 'okr-item';
            krList.innerHTML = '<span class="okr-label">主要成果:</span>';
            
            const krUl = document.createElement('ul');
            brand.okrKpi.keyResults.forEach(kr => {
                const li = document.createElement('li');
                li.textContent = kr;
                krUl.appendChild(li);
            });
            
            krList.appendChild(krUl);
            okrContent.appendChild(krList);
        }
        
        if (brand.okrKpi.kpis && brand.okrKpi.kpis.length > 0) {
            const kpiList = document.createElement('div');
            kpiList.className = 'okr-item';
            kpiList.innerHTML = '<span class="okr-label">KPI:</span>';
            
            const kpiUl = document.createElement('ul');
            brand.okrKpi.kpis.forEach(kpi => {
                const li = document.createElement('li');
                li.textContent = kpi;
                kpiUl.appendChild(li);
            });
            
            kpiList.appendChild(kpiUl);
            okrContent.appendChild(kpiList);
        }
        
        okrSection.appendChild(okrContent);
        grid.appendChild(okrSection);
    }
    
    // タスクセクション
    if (brand.tasks && brand.tasks.length > 0) {
        const tasksSection = createSection('タスク');
        const tasksContent = document.createElement('div');
        tasksContent.className = 'section-content';
        
        const taskList = document.createElement('ul');
        taskList.className = 'task-list';
        
        brand.tasks.forEach(task => {
            const taskItem = document.createElement('li');
            taskItem.className = task.completed ? 'task-item completed' : 'task-item';
            
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'task-checkbox';
            checkbox.checked = task.completed;
            checkbox.dataset.taskId = task.id;
            checkbox.dataset.brandId = brand.id;
            
            const taskText = document.createElement('span');
            taskText.className = 'task-text';
            taskText.textContent = task.text;
            
            taskItem.appendChild(checkbox);
            taskItem.appendChild(taskText);
            
            if (task.important) {
                const importantTag = document.createElement('span');
                importantTag.className = 'important-tag';
                importantTag.textContent = '重要';
                taskItem.appendChild(importantTag);
            }
            
            taskList.appendChild(taskItem);
        });
        
        tasksContent.appendChild(taskList);
        tasksSection.appendChild(tasksContent);
        grid.appendChild(tasksSection);
    }
    
    card.appendChild(grid);
    return card;
}

// セクション作成用ヘルパー関数
function createSection(title) {
    const section = document.createElement('div');
    section.className = 'brand-section';
    
    const titleElement = document.createElement('h4');
    titleElement.className = 'section-title handwritten';
    titleElement.textContent = title;
    
    section.appendChild(titleElement);
    return section;
}

// タスク一覧表示関数
function renderTasksTable(filter = 'all') {
    const taskList = document.querySelector('.brand-tasks-container');
    currentTaskFilter = filter;
    
    if (!taskList) {
        console.error('タスク一覧コンテナが見つかりません');
        return;
    }
    
    // 一覧をクリア
    taskList.innerHTML = '';
    
    // 全ブランドのタスクを収集
    brandsData.forEach(brand => {
        if (!brand.tasks || brand.tasks.length === 0) return;
        
        // ブランド名を表示
        const brandHeader = document.createElement('h3');
        brandHeader.textContent = brand.name;
        brandHeader.className = 'brand-task-header';
        taskList.appendChild(brandHeader);
        
        // タスクリストを作成
        const tasks = document.createElement('div');
        tasks.className = 'tasks-list';
        
        brand.tasks.forEach(task => {
            // フィルターによる表示制御
            if (filter === 'important' && !task.important) return;
            if (filter === 'completed' && !task.completed) return;
            if (filter === 'incomplete' && task.completed) return;
            
            const taskItem = document.createElement('div');
            taskItem.className = 'task-item' + (task.completed ? ' completed' : '');
            
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = task.completed;
            checkbox.dataset.taskId = task.id;
            checkbox.dataset.brandId = brand.id;
            
            const taskText = document.createElement('span');
            taskText.textContent = task.text;
            taskText.className = 'task-text';
            
            taskItem.appendChild(checkbox);
            taskItem.appendChild(taskText);
            
            if (task.important) {
                const importantTag = document.createElement('span');
                importantTag.className = 'important-tag';
                importantTag.textContent = '重要';
                taskItem.appendChild(importantTag);
            }
            
            tasks.appendChild(taskItem);
        });
        
        taskList.appendChild(tasks);
    });
    
    // フィルターボタンの状態を更新
    updateFilterButtons(filter);
}

// フィルターボタンの初期化
function initFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.dataset.filter;
            renderTasksTable(filter);
        });
    });
    
    // 初期状態を設定
    updateFilterButtons('all');
}

// フィルターボタンの状態更新
function updateFilterButtons(activeFilter) {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        if (button.dataset.filter === activeFilter) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}

// タスク追加ボタンの初期化
function initAddTaskButton() {
    const addTaskBtn = document.getElementById('add-task-btn');
    if (addTaskBtn) {
        addTaskBtn.addEventListener('click', function() {
            console.log('タスク追加ボタンがクリックされました');
            // タスク追加モーダルを表示（将来的に実装）
        });
    }
}

// イベントリスナー設定
function setupEventListenersOriginal() {
    // タスクチェックボックスのイベントリスナー
    document.addEventListener('change', function(e) {
        if (e.target.type === 'checkbox') {
            const taskId = e.target.dataset.taskId;
            const brandId = e.target.dataset.brandId;
            
            if (taskId && brandId) {
                const completed = e.target.checked;
                updateTaskStatus(brandId, taskId, completed);
                
                // タスク一覧も更新
                renderTasksTable(currentTaskFilter);
            }
        }
    });
    
    // 編集ボタンのイベントリスナー
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('edit-button')) {
            const brandId = e.target.dataset.brandId;
            console.log(`ブランド ${brandId} の編集ボタンがクリックされました`);
            // 編集フォームを表示（将来的に実装）
        }
    });
    
    // タスク追加ボタンのイベントリスナーを設定
    initAddTaskButton();
}

// タスクステータス更新
function updateTaskStatus(brandId, taskId, completed) {
    console.log(`タスク更新: ブランド ${brandId}, タスク ${taskId}, 完了=${completed}`);
    
    // ブランドを検索
    const brand = brandsData.find(b => b.id.toString() === brandId.toString());
    if (!brand) {
        console.error(`ブランドID ${brandId} が見つかりません`);
        return;
    }
    
    // タスクを検索
    const task = brand.tasks.find(t => t.id.toString() === taskId.toString());
    if (!task) {
        console.error(`タスクID ${taskId} が見つかりません`);
        return;
    }
    
    // タスクの完了状態を更新
    task.completed = completed;
    console.log(`タスク "${task.text}" の状態を ${completed ? '完了' : '未完了'} に更新しました`);
    
    // UIの更新
    const taskItems = document.querySelectorAll(`.task-checkbox[data-task-id="${taskId}"][data-brand-id="${brandId}"]`);
    taskItems.forEach(item => {
        const listItem = item.closest('.task-item');
        if (completed) {
            listItem.classList.add('completed');
        } else {
            listItem.classList.remove('completed');
        }
    });
}

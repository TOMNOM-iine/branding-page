// タスク関連の機能を集約したファイル

// タスク削除処理
async function deleteTask(taskId, brandId) {
    if (confirm('このタスクを削除しますか？')) {
        try {
            console.log('削除処理を開始します:', taskId, '-', brandId);
            const brandIndex = brandsData.findIndex(b => b.id === brandId);
            if (brandIndex === -1) {
                console.error('タスク削除時にブランドが見つかりません:', brandId);
                return false;
            }
            
            console.log('ブランドが見つかりました:', brandIndex);
            
            // タスクの削除前後のタスク数をログに出力
            const beforeCount = brandsData[brandIndex].tasks.length;
            
            // タスクを削除
            brandsData[brandIndex].tasks = brandsData[brandIndex].tasks.filter(task => task.id !== parseInt(taskId));
            
            // タスクが削除されたことを確認
            const afterCount = brandsData[brandIndex].tasks.length;
            console.log('タスク削除:', beforeCount, '->', afterCount);
            
            if (beforeCount === afterCount) {
                console.warn('タスクが削除されていません。IDが一致しない可能性があります。taskId:', taskId);
                console.log('タスク一覧:', brandsData[brandIndex].tasks.map(t => t.id));
                return false;
            }
            
            // データを保存
            await saveDataToLocalStorage();
            // Supabase タスクテーブルから削除
            if (!isLocalStorageMode()) {
                const { error: dbErr } = await supabase.from('tasks').delete().eq('id', taskId);
                if (dbErr) console.error('Supabaseタスク削除エラー:', dbErr);
            }
            
            console.log('データを保存しました');
            
            // UIから要素を削除（gridレイアウトとリストレイアウト両方に対応）
            const taskElement = document.querySelector(`.task-card[data-task-id="${taskId}"][data-brand-id="${brandId}"], .task-item[data-task-id="${taskId}"][data-brand-id="${brandId}"]`);
            
            if (taskElement) {
                taskElement.remove();
                console.log('タスク要素をDOMから削除しました:', taskElement.className);
            } else {
                console.warn('削除するタスク要素が見つかりませんでした。表示を更新します。');
                // 表示を更新
                renderBrandTasksUI();
            }
            
            // 保存通知
            showSaveNotification('タスクを削除しました');
            
            console.log('タスクが正常に削除されました:', taskId);
            return true;
        } catch (error) {
            console.error('タスク削除中にエラーが発生しました:', error);
            alert('タスクの削除中にエラーが発生しました\n' + error.message);
            return false;
        }
    }
    
    return false; // キャンセルした場合
}

// タスクの完了状態を切り替え
async function toggleTaskComplete(taskId, brandId, isComplete) {
    try {
        console.log('タスク完了状態の切り替え:', taskId, brandId, isComplete);
        
        // ブランドインデックスを取得
        const brandIndex = brandsData.findIndex(b => b.id === brandId);
        if (brandIndex === -1) {
            console.error('ブランドが見つかりません:', brandId);
            return false;
        }
        
        // タスクインデックスを取得
        const taskIndex = brandsData[brandIndex].tasks.findIndex(t => t.id === parseInt(taskId));
        if (taskIndex === -1) {
            console.error('タスクが見つかりません:', taskId);
            return false;
        }
        
        // タスク完了状態を更新
        brandsData[brandIndex].tasks[taskIndex].completed = isComplete;
        
        // データを保存
        await saveDataToLocalStorage();
        // Supabase タスク更新
        if (!isLocalStorageMode()) {
            const { error: dbErr } = await supabase.from('tasks').update({ completed: isComplete }).eq('id', taskId);
            if (dbErr) console.error('Supabaseタスク更新エラー:', dbErr);
        }
        
        // UI上でタスクカードのクラスを更新
        // brandIdも含めて正確にタスク要素を特定
        const taskCard = document.querySelector(`.task-card[data-task-id="${taskId}"][data-brand-id="${brandId}"]`);
        if (taskCard) {
            if (isComplete) {
                taskCard.classList.add('completed');
            } else {
                taskCard.classList.remove('completed');
            }
        } else {
            console.warn('タスクカード要素が見つかりません');
        }
        
        return true;
    } catch (error) {
        console.error('タスク完了状態の更新中にエラーが発生しました:', error);
        return false;
    }
}

// タスクの重要度を切り替え
async function toggleTaskImportant(taskId, brandId, isImportant) {
    try {
        console.log('タスク重要度の切り替え:', taskId, brandId, isImportant);
        
        // ブランドインデックスを取得
        const brandIndex = brandsData.findIndex(b => b.id === brandId);
        if (brandIndex === -1) {
            console.error('ブランドが見つかりません:', brandId);
            return false;
        }
        
        // タスクインデックスを取得
        const taskIndex = brandsData[brandIndex].tasks.findIndex(t => t.id === parseInt(taskId));
        if (taskIndex === -1) {
            console.error('タスクが見つかりません:', taskId);
            return false;
        }
        
        // タスク重要度を更新
        brandsData[brandIndex].tasks[taskIndex].important = isImportant;
        
        // データを保存
        await saveDataToLocalStorage();
        // Supabase タスク更新
        if (!isLocalStorageMode()) {
            const { error: dbErr } = await supabase.from('tasks').update({ important: isImportant }).eq('id', taskId);
            if (dbErr) console.error('Supabaseタスク更新エラー:', dbErr);
        }
        
        // UI上でスターのクラスを更新
        // brandIdも含めて正確にタスク要素を特定
        const starElement = document.querySelector(`.task-star[data-task-id="${taskId}"][data-brand-id="${brandId}"]`);
        if (starElement) {
            if (isImportant) {
                starElement.classList.add('important');
            } else {
                starElement.classList.remove('important');
            }
        } else {
            console.warn('重要タスクのスター要素が見つかりません');
        }
        
        return true;
    } catch (error) {
        console.error('タスク重要度の更新中にエラーが発生しました:', error);
        return false;
    }
}

// 新しいタスクを追加
async function addTask(brandId, taskText) {
    try {
        console.log('タスク追加:', brandId, taskText);
        
        // ブランドインデックスを取得
        const brandIndex = brandsData.findIndex(b => b.id === brandId);
        if (brandIndex === -1) {
            console.error('ブランドが見つかりません:', brandId);
            return false;
        }
        
        // 新しいタスクIDを生成（既存の最大ID + 1）
        let maxId = 0;
        if (brandsData[brandIndex].tasks && brandsData[brandIndex].tasks.length > 0) {
            maxId = Math.max(...brandsData[brandIndex].tasks.map(t => t.id));
        }
        const newTaskId = maxId + 1;
        
        // 新しいタスクを作成
        let newTask = {
            id: newTaskId,
            text: taskText,
            completed: false,
            important: false
        };
        
        // タスク配列がない場合は初期化
        if (!Array.isArray(brandsData[brandIndex].tasks)) {
            brandsData[brandIndex].tasks = [];
        }
        
        // タスクを追加
        brandsData[brandIndex].tasks.push(newTask);
        
        // データを保存
        await saveDataToLocalStorage();
        // Supabaseに新規タスク挿入
        if (!isLocalStorageMode()) {
            const { data: inserted, error: dbErr } = await supabase.from('tasks').insert([{ brand_id: brandId, text: taskText, completed: false, important: false }]).select();
            if (dbErr) {
                console.error('Supabaseタスク追加エラー:', dbErr);
            } else if (inserted && inserted.length > 0) {
                newTask.id = inserted[0].id;
                // ローカルデータIDを更新
                brandsData[brandIndex].tasks[brandsData[brandIndex].tasks.length - 1].id = newTask.id;
                saveDataToLocalStorage();
            }
        }
        
        // 画面を更新
        renderBrandTasksUI();
        
        // 保存通知
        showSaveNotification('新しいタスクを追加しました');
        
        return true;
    } catch (error) {
        console.error('タスク追加中にエラーが発生しました:', error);
        return false;
    }
}

// タスクのイベントリスナー設定
function setupTaskEventListeners() {
    try {
        console.log('タスクイベントリスナーを設定中');
        
        // 削除ボタンのイベントリスナー設定
        document.querySelectorAll('.task-delete-btn').forEach(button => {
            // 既存のイベントリスナーを削除して再設定
            const newButton = button.cloneNode(true);
            button.parentNode.replaceChild(newButton, button);
            
            newButton.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const taskId = this.getAttribute('data-task-id');
                const brandId = this.getAttribute('data-brand-id');
                
                console.log('削除ボタンがクリックされました:', taskId, brandId);
                if (taskId && brandId) {
                    deleteTask(taskId, brandId);
                }
            });
        });
        
        // チェックボックスのイベントリスナー設定
        document.querySelectorAll('.task-checkbox').forEach(checkbox => {
            const newCheckbox = checkbox.cloneNode(true);
            checkbox.parentNode.replaceChild(newCheckbox, checkbox);
            
            newCheckbox.addEventListener('change', function() {
                const taskId = this.getAttribute('data-task-id');
                const brandId = this.getAttribute('data-brand-id');
                const isChecked = this.checked;
                
                console.log('チェックボックスが変更されました:', taskId, brandId, isChecked);
                if (taskId && brandId) {
                    toggleTaskComplete(taskId, brandId, isChecked);
                }
            });
        });
        
        // 重要マークのイベントリスナー設定
        document.querySelectorAll('.task-star').forEach(star => {
            const newStar = star.cloneNode(true);
            star.parentNode.replaceChild(newStar, star);
            
            newStar.addEventListener('click', function() {
                const taskId = this.getAttribute('data-task-id');
                const brandId = this.getAttribute('data-brand-id');
                const isImportant = this.classList.contains('important');
                
                console.log('重要マークがクリックされました:', taskId, brandId, !isImportant);
                if (taskId && brandId) {
                    toggleTaskImportant(taskId, brandId, !isImportant);
                }
            });
        });
        
        // タスクテキストのクリックでタスク編集モードを開始
        document.querySelectorAll('.task-text').forEach(taskText => {
            const newTaskText = taskText.cloneNode(true);
            taskText.parentNode.replaceChild(newTaskText, taskText);
            
            newTaskText.addEventListener('click', function() {
                // グリッドレイアウト版: .task-item を基点にデータ取得
                const item = this.closest('.task-item');
                const taskId = item?.getAttribute('data-task-id');
                const brandId = item?.getAttribute('data-brand-id');

                console.log('タスクテキストがクリックされました:', taskId, brandId);
                if (taskId && brandId) {
                    // タスク編集モーダルを表示
                    showTaskEditModal(taskId, brandId);
                }
            });
        });
        
        console.log('タスクイベントリスナーの設定が完了しました');
    } catch (error) {
        console.error('タスクイベントリスナーの設定中にエラーが発生しました:', error);
    }
}

// タスク入力と追加ボタンのイベントリスナーを設定
function setupTaskInputListeners() {
    try {
        // タスク追加ボタンと入力フィールドのイベントリスナーを設定
        document.querySelectorAll('.add-task-btn').forEach(button => {
            const newButton = button.cloneNode(true);
            button.parentNode.replaceChild(newButton, button);
            
            newButton.addEventListener('click', function() {
                const brandId = this.getAttribute('data-brand-id');
                const brandCard = document.getElementById(`brand-${brandId}-tasks`);
                const addTaskCard = brandCard.querySelector('.add-task-card');
                const taskInput = brandCard.querySelector('.new-task-input');
                
                // タスク入力欄を表示して、フォーカス
                addTaskCard.style.display = 'block';
                taskInput.focus();
            });
        });
        
        // タスク入力欄のEnterキーイベントリスナー
        document.querySelectorAll('.new-task-input').forEach(input => {
            const newInput = input.cloneNode(true);
            input.parentNode.replaceChild(newInput, input);
            
            newInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    const brandId = this.getAttribute('data-brand-id');
                    const taskText = this.value.trim();
                    if (taskText) {
                        addTask(brandId, taskText);
                        this.value = '';
                    }
                }
            });
        });
        
        // タスク追加ボタンのクリックイベントリスナー
        document.querySelectorAll('.submit-task-btn').forEach(button => {
            const newButton = button.cloneNode(true);
            button.parentNode.replaceChild(newButton, button);
            
            newButton.addEventListener('click', function() {
                const brandId = this.getAttribute('data-brand-id');
                const brandCard = document.getElementById(`brand-${brandId}-tasks`);
                const taskInput = brandCard.querySelector('.new-task-input');
                const taskText = taskInput.value.trim();
                
                if (taskText) {
                    addTask(brandId, taskText);
                    taskInput.value = '';
                }
            });
        });
        
        console.log('タスク入力リスナーの設定が完了しました');
    } catch (error) {
        console.error('タスク入力リスナーの設定中にエラーが発生しました:', error);
    }
}

// タスク編集機能
function editTask(taskId, brandId, currentText) {
    try {
        console.log('タスク編集を開始します:', taskId, brandId);
        
        // 編集対象のタスクを取得
        const brandIndex = brandsData.findIndex(b => b.id === brandId);
        if (brandIndex === -1) {
            console.error('編集対象のブランドが見つかりません:', brandId);
            return;
        }
        
        const taskIndex = brandsData[brandIndex].tasks.findIndex(t => t.id === parseInt(taskId));
        if (taskIndex === -1) {
            console.error('編集対象のタスクが見つかりません:', taskId);
            return;
        }
        
        // 編集対象のタスクカードを取得
        const taskCard = document.querySelector(`.task-card[data-task-id="${taskId}"][data-brand-id="${brandId}"]`);
        if (!taskCard) {
            console.error('タスクカードが見つかりません');
            return;
        }
        
        // 現在のタスクテキスト要素
        const taskTextElement = taskCard.querySelector('.task-text');
        if (!taskTextElement) {
            console.error('タスクテキスト要素が見つかりません');
            return;
        }
        
        // 元のテキストを保存
        const originalText = currentText || taskTextElement.textContent;
        
        // 編集フィールドに変換
        const editField = document.createElement('input');
        editField.type = 'text';
        editField.className = 'task-edit-field';
        editField.value = originalText;
        
        // キーイベントをハンドルする
        editField.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                saveTaskEdit(taskId, brandId, this.value, originalText);
            }
        });
        
        editField.addEventListener('blur', function() {
            saveTaskEdit(taskId, brandId, this.value, originalText);
        });
        
        // テキスト要素をエディットフィールドに置き換え
        taskTextElement.replaceWith(editField);
        
        // フォーカスを設定
        editField.focus();
        editField.select();
        
        console.log('タスク編集フィールドを表示しました');
    } catch (error) {
        console.error('タスク編集の初期化中にエラーが発生しました:', error);
    }
}

// タスク編集を保存
async function saveTaskEdit(taskId, brandId, newText, originalText) {
    try {
        console.log('タスク編集を保存します:', taskId, brandId, newText);
        
        // 空白の場合は元のテキストに戻す
        if (!newText.trim()) {
            console.warn('空のタスクは許可されていません。元のテキストに戻します。');
            newText = originalText;
        }
        
        // 変更がない場合は処理をスキップ
        if (newText.trim() === originalText.trim()) {
            console.log('変更がないため保存をスキップします');
            // 編集フィールドを通常のテキストに戻す
            const editField = document.querySelector(`.task-card[data-task-id="${taskId}"][data-brand-id="${brandId}"] .task-edit-field`);
            if (editField) {
                const taskText = document.createElement('span');
                taskText.className = 'task-text';
                taskText.textContent = originalText;
                editField.replaceWith(taskText);
                
                // イベントリスナーを再設定
                setupTaskEventListeners();
            }
            return;
        }
        
        // データを更新
        const brandIndex = brandsData.findIndex(b => b.id === brandId);
        if (brandIndex === -1) {
            console.error('ブランドが見つかりません:', brandId);
            return;
        }
        
        const taskIndex = brandsData[brandIndex].tasks.findIndex(t => t.id === parseInt(taskId));
        if (taskIndex === -1) {
            console.error('タスクが見つかりません:', taskId);
            return;
        }
        
        // タスクテキストを更新
        brandsData[brandIndex].tasks[taskIndex].text = newText.trim();
        
        // ローカルストレージに保存
        await saveDataToLocalStorage();
        
        // Supabaseにも保存（ローカルストレージモードでない場合）
        if (!isLocalStorageMode()) {
            const { error } = await saveBrandToSupabase(brandsData[brandIndex]);
            if (error) {
                console.error('タスク編集後のSupabaseへの保存中にエラーが発生しました:', error);
            }
        }
        
        // UI要素を更新
        const editField = document.querySelector(`.task-card[data-task-id="${taskId}"][data-brand-id="${brandId}"] .task-edit-field`);
        if (editField) {
            const taskText = document.createElement('span');
            taskText.className = 'task-text';
            taskText.textContent = newText;
            editField.replaceWith(taskText);
            
            // イベントリスナーを再設定
            setupTaskEventListeners();
        }
        
        // 保存通知
        showSaveNotification('タスクを更新しました');
        console.log('タスク編集が保存されました:', taskId);
    } catch (error) {
        console.error('タスク編集の保存中にエラーが発生しました:', error);
        alert('タスク編集の保存中にエラーが発生しました\n' + error.message);
        
        // エラー時に元のテキストに戻す
        const editField = document.querySelector(`.task-card[data-task-id="${taskId}"][data-brand-id="${brandId}"] .task-edit-field`);
        if (editField) {
            const taskText = document.createElement('span');
            taskText.className = 'task-text';
            taskText.textContent = originalText;
            editField.replaceWith(taskText);
            
            // イベントリスナーを再設定
            setupTaskEventListeners();
        }
    }
}

// ブランドタスクUIの表示
function renderBrandTasksUI(filter = 'all') {
    try {
        console.log('ブランドタスクリストをレンダリング中:', filter);
        const brandTaskGrid = document.getElementById('brand-task-grid');
        if (!brandTaskGrid) {
            console.error('brand-task-gridが見つかりません');
            return;
        }
        
        // 既存のコンテンツをクリア
        brandTaskGrid.innerHTML = '';
        
        brandsData.forEach(brand => {
            if (!brand || !Array.isArray(brand.tasks)) {
                console.warn('無効なブランドデータ:', brand);
                return;
            }
            
            // フィルター処理
            let filteredTasks = brand.tasks || [];
            
            if (filter === 'important') {
                filteredTasks = filteredTasks.filter(task => task.important);
            } else if (filter === 'incomplete') {
                filteredTasks = filteredTasks.filter(task => !task.completed);
            } else if (filter === 'completed') {
                filteredTasks = filteredTasks.filter(task => task.completed);
            }
            
            // ブランドカードを作成
            const brandCard = document.createElement('div');
            brandCard.className = 'brand-task-card';
            brandCard.id = `brand-${brand.id}-tasks`;
            
            // ブランド名とタスク追加ボタンのヘッダー
            const brandHeader = document.createElement('div');
            brandHeader.className = 'brand-task-header';
            brandHeader.innerHTML = `
                <h3>${brand.name || 'ブランド名なし'}</h3>
                <button class="add-task-btn" data-brand-id="${brand.id}">
                    <i class="fas fa-plus"></i> タスク追加
                </button>
            `;
            
            // タスクリストの作成
            const taskList = document.createElement('div');
            taskList.className = 'task-list';
            
            // フィルター適用後のタスクをリストに追加
            filteredTasks.forEach(task => {
                if (!task || !task.id) {
                    console.warn('無効なタスクデータ:', task);
                    return;
                }
                
                const taskCard = document.createElement('div');
                taskCard.className = `task-card ${task.completed ? 'completed' : ''}`;
                taskCard.setAttribute('data-task-id', task.id);
                taskCard.setAttribute('data-brand-id', brand.id);
                
                taskCard.innerHTML = `
                    <div class="task-content">
                        <input type="checkbox" class="task-checkbox" data-task-id="${task.id}" data-brand-id="${brand.id}" ${task.completed ? 'checked' : ''}>
                        <span class="task-text">${task.text || ''}</span>
                    </div>
                    <div class="task-actions">
                        <i class="fas fa-star task-star ${task.important ? 'important' : ''}" data-task-id="${task.id}" data-brand-id="${brand.id}"></i>
                        <button class="task-delete-btn" data-task-id="${task.id}" data-brand-id="${brand.id}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                `;
                
                taskList.appendChild(taskCard);
            });
            
            // タスク追加カードを作成
            const addTaskCard = document.createElement('div');
            addTaskCard.className = 'add-task-card';
            addTaskCard.innerHTML = `
                <div class="task-input-container">
                    <input type="text" class="new-task-input" placeholder="新しいタスク..." data-brand-id="${brand.id}">
                    <button class="submit-task-btn" data-brand-id="${brand.id}">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
            `;
            
            // 各要素をブランドカードに追加
            brandCard.appendChild(brandHeader);
            brandCard.appendChild(taskList);
            brandCard.appendChild(addTaskCard);
            
            // カードをグリッドに追加
            brandTaskGrid.appendChild(brandCard);
        });
        
        // タスク追加ボタンと入力フィールドのイベントリスナーを設定
        setupTaskInputListeners();
        
        // タスクのチェックボックス、削除ボタン、重要マークのイベントリスナーを設定
        setupTaskEventListeners();
        
        console.log('ブランドタスクUIのレンダリングが完了しました');
    } catch (error) {
        console.error('ブランドタスクUIのレンダリング中にエラーが発生しました:', error);
    }
}

// タスクの編集モーダルを表示
function showTaskEditModal(taskId, brandId) {
    try {
        console.log(`タスク編集モーダルを表示: ID=${taskId}, ブランド=${brandId}`);
        
        // ブランドとタスクを取得
        const brand = brandsData.find(b => b.id.toString() === brandId.toString());
        if (!brand) {
            console.error(`ブランドが見つかりません: ${brandId}`);
            return;
        }
        
        const task = brand.tasks.find(t => t.id.toString() === taskId.toString());
        if (!task) {
            console.error(`タスクが見つかりません: ${taskId}`);
            return;
        }
        
        // モーダルの各フィールドにデータを設定
        document.getElementById('task-id').value = task.id;
        document.getElementById('task-brand-id').value = brand.id;
        document.getElementById('task-text').value = task.text;
        document.getElementById('task-completed').checked = task.completed;
        document.getElementById('task-important').checked = task.important;
        
        // ブランド選択ドロップダウンを設定
        const brandSelect = document.getElementById('task-brand');
        brandSelect.innerHTML = '';
        
        brandsData.forEach(b => {
            const option = document.createElement('option');
            option.value = b.id;
            option.textContent = b.name;
            if (b.id.toString() === brand.id.toString()) {
                option.selected = true;
            }
            brandSelect.appendChild(option);
        });
        
        // モーダルを表示
        document.getElementById('task-modal').classList.add('show');
    } catch (error) {
        console.error('タスク編集モーダル表示中にエラーが発生しました:', error);
    }
}

// 新しいタスクを追加
function addNewTask(brandId, taskText) {
    try {
        // 入力チェック
        if (!taskText.trim()) {
            return false;
        }
        
        // ブランドを検索
        const brand = brandsData.find(b => b.id.toString() === brandId.toString());
        if (!brand) {
            console.error(`ブランドが見つかりません: ${brandId}`);
            return false;
        }
        
        // 新しいタスクID
        let maxId = 0;
        brandsData.forEach(b => {
            b.tasks.forEach(t => {
                maxId = Math.max(maxId, parseInt(t.id) || 0);
            });
        });
        
        // タスクを追加
        const newTask = {
            id: maxId + 1,
            text: taskText.trim(),
            completed: false,
            important: false
        };
        
        if (!brand.tasks) {
            brand.tasks = [];
        }
        
        brand.tasks.push(newTask);
        
        // データを保存
        saveDataToLocalStorage();
        
        // 表示を更新
        renderBrandTasksUI(currentTaskFilter);
        
        // 通知を表示
        showNotification(`「${brand.name}」にタスクを追加しました`);
        
        return true;
    } catch (error) {
        console.error('タスク追加中にエラーが発生しました:', error);
        return false;
    }
}

// タスクを削除
function deleteTask(taskId, brandId) {
    try {
        // ブランドを検索
        const brand = brandsData.find(b => b.id.toString() === brandId.toString());
        if (!brand) {
            console.error(`ブランドが見つかりません: ${brandId}`);
            return false;
        }
        
        // タスクのテキストを保存（通知用）
        const task = brand.tasks.find(t => t.id.toString() === taskId.toString());
        if (!task) {
            console.error(`タスクが見つかりません: ${taskId}`);
            return false;
        }
        
        const taskText = task.text;
        
        // タスクを削除
        brand.tasks = brand.tasks.filter(t => t.id.toString() !== taskId.toString());
        
        // データを保存
        saveDataToLocalStorage();
        
        // 表示を更新
        renderBrandTasksUI(currentTaskFilter);
        
        // 通知を表示
        showNotification(`「${taskText}」を削除しました`);
        
        return true;
    } catch (error) {
        console.error('タスク削除中にエラーが発生しました:', error);
        return false;
    }
}

// タスクの完了状態を切り替え
function toggleTaskCompletion(taskId, brandId, isCompleted) {
    try {
        // ブランドを検索
        const brand = brandsData.find(b => b.id.toString() === brandId.toString());
        if (!brand) {
            console.error(`ブランドが見つかりません: ${brandId}`);
            return false;
        }
        
        // タスクを検索
        const task = brand.tasks.find(t => t.id.toString() === taskId.toString());
        if (!task) {
            console.error(`タスクが見つかりません: ${taskId}`);
            return false;
        }
        
        // タスクを更新
        task.completed = isCompleted;
        
        // データを保存
        saveDataToLocalStorage();
        
        // 表示を更新
        renderBrandTasksUI(currentTaskFilter);
        
        // 通知を表示
        showNotification(isCompleted ? 'タスクを完了としてマークしました' : 'タスクを未完了に戻しました');
        
        return true;
    } catch (error) {
        console.error('タスク完了状態切り替え中にエラーが発生しました:', error);
        return false;
    }
}

// タスクの重要度を切り替え
function toggleTaskImportance(taskId, brandId) {
    try {
        // ブランドを検索
        const brand = brandsData.find(b => b.id.toString() === brandId.toString());
        if (!brand) {
            console.error(`ブランドが見つかりません: ${brandId}`);
            return false;
        }
        
        // タスクを検索
        const task = brand.tasks.find(t => t.id.toString() === taskId.toString());
        if (!task) {
            console.error(`タスクが見つかりません: ${taskId}`);
            return false;
        }
        
        // タスクを更新
        task.important = !task.important;
        
        // データを保存
        saveDataToLocalStorage();
        
        // 表示を更新
        renderBrandTasksUI(currentTaskFilter);
        
        // 通知を表示
        showNotification(task.important ? 'タスクを重要としてマークしました' : '重要マークを解除しました');
        
        return true;
    } catch (error) {
        console.error('タスク重要度切り替え中にエラーが発生しました:', error);
        return false;
    }
}

// タスク編集フォームの初期化
document.addEventListener('DOMContentLoaded', function() {
    // タスク編集モーダルの閉じるボタン
    document.querySelector('.close-modal').addEventListener('click', function() {
        document.getElementById('task-modal').classList.remove('show');
    });
    
    // タスク編集フォームのキャンセルボタン
    document.querySelector('.cancel-button').addEventListener('click', function() {
        document.getElementById('task-modal').classList.remove('show');
    });
    
    // タスク編集フォームの送信
    document.getElementById('task-edit-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const taskId = document.getElementById('task-id').value;
        const oldBrandId = document.getElementById('task-brand-id').value;
        const newBrandId = document.getElementById('task-brand').value;
        const taskText = document.getElementById('task-text').value;
        const isCompleted = document.getElementById('task-completed').checked;
        const isImportant = document.getElementById('task-important').checked;
        
        console.log(`タスク更新: ID=${taskId}, 古いブランド=${oldBrandId}, 新しいブランド=${newBrandId}`);
        
        if (oldBrandId === newBrandId) {
            // 同じブランド内でのタスク更新
            const brand = brandsData.find(b => b.id.toString() === oldBrandId.toString());
            if (!brand) {
                console.error(`ブランドが見つかりません: ${oldBrandId}`);
                return;
            }
            
            const task = brand.tasks.find(t => t.id.toString() === taskId.toString());
            if (!task) {
                console.error(`タスクが見つかりません: ${taskId}`);
                return;
            }
            
            // タスクを更新
            task.text = taskText;
            task.completed = isCompleted;
            task.important = isImportant;
            
            // 通知を表示
            showNotification('タスクを更新しました');
        } else {
            // 異なるブランドへのタスク移動
            const oldBrand = brandsData.find(b => b.id.toString() === oldBrandId.toString());
            if (!oldBrand) {
                console.error(`元のブランドが見つかりません: ${oldBrandId}`);
                return;
            }
            
            const newBrand = brandsData.find(b => b.id.toString() === newBrandId.toString());
            if (!newBrand) {
                console.error(`新しいブランドが見つかりません: ${newBrandId}`);
                return;
            }
            
            // タスクを検索し削除
            const taskIndex = oldBrand.tasks.findIndex(t => t.id.toString() === taskId.toString());
            if (taskIndex === -1) {
                console.error(`タスクが見つかりません: ${taskId}`);
                return;
            }
            
            const task = oldBrand.tasks.splice(taskIndex, 1)[0];
            
            // タスクを更新して新しいブランドに追加
            task.text = taskText;
            task.completed = isCompleted;
            task.important = isImportant;
            
            if (!newBrand.tasks) {
                newBrand.tasks = [];
            }
            
            newBrand.tasks.push(task);
            
            // 通知を表示
            showNotification(`タスクを「${newBrand.name}」に移動しました`);
        }
        
        // データを保存
        saveDataToLocalStorage();
        
        // モーダルを閉じる
        document.getElementById('task-modal').classList.remove('show');
        
        // 画面を更新
        renderBrandTasksUI(currentTaskFilter);
    });
    
    // 「新しいタスクを追加」ボタンのクリックイベント
    document.getElementById('add-task-btn').addEventListener('click', function() {
        // 新しいタスク追加モーダルを表示
        showAddTaskModal();
    });
});

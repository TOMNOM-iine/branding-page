// ブランド管理アプリ

// ブランドデータ (初期値は空の配列)
let brandsData = [
    {
        id: 'tom-sawyer',
        name: 'トム・ソーヤ',
        type: '放課後等デイサービス',
        equity: {
            why: '冒険と創造性を通じて子どもたちの自立心を育む',
            who: '支援が必要な小学生から高校生',
            what: '創造的活動と探究を通じた発達支援',
            how: '冒険的な体験学習と自己表現の場の提供'
        },
        awareness: 75, // 認知度（％）
        preference: 82, // 選好度（％）
        strategy: {
            concept: '冒険と発見をテーマにした支援プログラム',
            positioning: '創造性重視の体験型発達支援サービス',
            uniqueValue: '自然体験と創作活動の融合',
            targetAudience: '好奇心旺盛で体験的な学びを求める家族'
        },
        okrKpi: {
            objective: '子どもたちの自己表現力と社会適応能力の向上',
            keyResults: [
                '利用者満足度90%以上を維持',
                '年間プログラム参加率85%達成',
                '個別支援計画の目標達成率75%以上'
            ],
            kpis: [
                '新規利用者獲得数：月平2名',
                '既存利用者継続率：95%',
                'SNSエンゲージメント率：15%向上'
            ]
        },
        tasks: [
            {id: 1, text: '季節ごとの冒険プログラム企画', completed: false, important: true},
            {id: 2, text: '利用者アンケートの実施と分析', completed: true, important: false},
            {id: 3, text: '地域連携イベントの計画立案', completed: false, important: true},
            {id: 4, text: '個別支援計画の四半期レビュー', completed: false, important: false},
            {id: 5, text: 'SNSコンテンツカレンダーの作成', completed: true, important: false}
        ]
    },
    {
        id: 'robin-hood',
        name: 'ロビンフッド',
        type: '放課後等デイサービス',
        equity: {
            why: '公正と協力の精神で子どもたちの社会性を育む',
            who: '支援が必要な小学生から中学生',
            what: 'チームワークと相互支援を通じた発達支援',
            how: '協力的な活動と共同プロジェクトの実施'
        },
        awareness: 68, // 認知度（％）
        preference: 76, // 選好度（％）
        strategy: {
            concept: '助け合いと分かち合いの精神を育むプログラム',
            positioning: '社会性発達に特化した支援サービス',
            uniqueValue: 'チームビルディング活動と社会貢献プロジェクト',
            targetAudience: '社会性の発達を重視する家族'
        },
        okrKpi: {
            objective: '子どもたちの協調性と社会参加意識の向上',
            keyResults: [
                'グループ活動参加率90%達成',
                '社会貢献プロジェクト年4回実施',
                '保護者からの社会性発達評価80%以上'
            ],
            kpis: [
                '新規利用者紹介率：25%',
                'チームプロジェクト完遂率：85%',
                'コミュニケーション能力評価：20%向上'
            ]
        },
        tasks: [
            {id: 1, text: '地域清掃活動の企画と実施', completed: false, important: true},
            {id: 2, text: 'チームビルディングワークショップの準備', completed: true, important: true},
            {id: 3, text: '協力型ゲームの新メニュー開発', completed: false, important: false},
            {id: 4, text: '保護者向け社会性発達勉強会の開催', completed: false, important: true},
            {id: 5, text: '子ども会議の定例化と記録', completed: true, important: false}
        ]
    },
    {
        id: 'tom-sawyer-2',
        name: 'トム・ソーヤ②',
        type: '放課後等デイサービス',
        equity: {
            why: '冒険精神と個性を尊重した発達支援',
            who: '支援が必要な小学生から高校生',
            what: '個別の強みを活かした創造的支援プログラム',
            how: '多様な表現方法と選択肢の提供'
        },
        awareness: 65, // 認知度（％）
        preference: 78, // 選好度（％）
        strategy: {
            concept: '一人ひとりの「冒険」をサポートするパーソナライズドケア',
            positioning: '個性重視の発達支援サービス',
            uniqueValue: '個別の興味関心に合わせたプログラムカスタマイズ',
            targetAudience: '子どもの個性を重視する家族'
        },
        okrKpi: {
            objective: '子どもたちの自己肯定感と自主性の向上',
            keyResults: [
                '個別興味分野での活動時間週50%以上確保',
                '自己選択によるプログラム参加率80%達成',
                '自己表現活動の成果発表機会を年6回以上提供'
            ],
            kpis: [
                'パーソナライズプラン作成率：100%',
                '個別目標達成率：75%',
                '保護者満足度：90%以上'
            ]
        },
        tasks: [
            {id: 1, text: '個別興味調査アンケートの実施', completed: true, important: true},
            {id: 2, text: 'パーソナライズドプログラムの策定', completed: false, important: true},
            {id: 3, text: '創作作品展示会の企画', completed: false, important: false},
            {id: 4, text: '選択制アクティビティメニューの拡充', completed: true, important: true},
            {id: 5, text: '個別進捗記録システムの改善', completed: false, important: false}
        ]
    },
    {
        id: 'noa-noa',
        name: 'ノアノア',
        type: '学童',
        equity: {
            why: '多様性と創造性を育む安全な放課後の居場所',
            who: '小学1年生から6年生',
            what: '学習と遊びのバランスの取れた総合的な放課後ケア',
            how: '遊び・学習・文化活動の調和のとれたプログラム'
        },
        awareness: 85, // 認知度（％）
        preference: 88, // 選好度（％）
        strategy: {
            concept: '「第二の家」としての温かく創造的な環境',
            positioning: '学習と遊びが調和する総合的学童サービス',
            uniqueValue: '多彩な活動と家庭的な雰囲気の両立',
            targetAudience: 'バランスの取れた成長を望む共働き家庭'
        },
        okrKpi: {
            objective: '子どもたちの総合的な成長と保護者の安心感の向上',
            keyResults: [
                '学習習慣定着率90%達成',
                '多様な活動への参加バランス指数80%以上',
                '保護者との情報共有満足度95%以上'
            ],
            kpis: [
                '定員充足率：95%以上',
                '継続利用率：90%以上',
                '学習サポート満足度：85%以上'
            ]
        },
        tasks: [
            {id: 1, text: '月間活動カレンダーの作成と共有', completed: true, important: true},
            {id: 2, text: '学習サポートプログラムの改善', completed: false, important: true},
            {id: 3, text: '季節行事の企画と準備', completed: false, important: false},
            {id: 4, text: '保護者連絡アプリの活用促進', completed: true, important: true},
            {id: 5, text: '環境整備と安全点検の実施', completed: false, important: true}
        ]
    },
    {
        id: 'ss',
        name: 'SS',
        type: '学習塾',
        equity: {
            why: '個別最適化された学習で自立した学習者を育成',
            who: '小学生から高校生',
            what: '個々の学習スタイルに合わせた効率的な学習指導',
            how: 'AI活用と個別カリキュラムによる最適化学習'
        },
        awareness: 70, // 認知度（％）
        preference: 85, // 選好度（％）
        strategy: {
            concept: '最新テクノロジーと個別指導の融合による学習革命',
            positioning: '未来型の個別最適化学習塾',
            uniqueValue: 'AIと人間講師のハイブリッド指導',
            targetAudience: '効率的で革新的な学習方法を求める家庭'
        },
        okrKpi: {
            objective: '生徒の学力向上と学習への主体性の育成',
            keyResults: [
                '定期テスト平均点20%向上',
                '自主学習時間週平均30%増加',
                '学習計画自己管理率70%達成'
            ],
            kpis: [
                '新規入塾者数：月平均5名',
                '継続率：85%以上',
                '志望校合格率：90%以上'
            ]
        },
        tasks: [
            {id: 1, text: 'AI学習分析レポートの作成', completed: false, important: true},
            {id: 2, text: '個別学習計画の月次更新', completed: true, important: true},
            {id: 3, text: '保護者面談の実施', completed: false, important: false},
            {id: 4, text: '模擬試験の結果分析と指導方針調整', completed: true, important: true},
            {id: 5, text: '新教材の開発と導入', completed: false, important: true}
        ]
    },
    {
        id: 5,
        name: 'AI食堂',
        type: '子供食堂',
        equity: {
            why: '食を通じた子どもの健全な成長と地域コミュニティの強化',
            who: '地域の子どもと家族',
            what: '栄養バランスの取れた食事提供と食育活動',
            how: 'AIを活用した効率的な運営と地域資源の活用'
        },
        awareness: 60, // 認知度（％）
        preference: 72, // 選好度（％）
        strategy: {
            concept: '「未来型コミュニティ食堂」としての新しい子ども食堂',
            positioning: 'テクノロジーを活用した持続可能な子ども食堂',
            uniqueValue: 'AI献立作成と食品ロス削減の両立',
            targetAudience: '食育に関心のある家族と地域コミュニティ'
        },
        okrKpi: {
            objective: '子どもたちの食生活改善と地域交流の活性化',
            keyResults: [
                '月間利用者数20%増加',
                '食育イベント参加率75%達成',
                'ボランティア参加者数15%増加'
            ],
            kpis: [
                '食材寄付協力店舗数：前年比30%増',
                '食品ロス削減率：20%',
                'リピート率：70%以上'
            ]
        },
        tasks: [
            {id: 1, text: '月間献立計画のAI最適化', completed: true, important: true},
            {id: 2, text: '地域生産者との連携強化', completed: false, important: true},
            {id: 3, text: '食育ワークショップの企画', completed: false, important: true},
            {id: 4, text: 'ボランティアスケジュール調整', completed: true, important: false},
            {id: 5, text: '食材在庫管理システムの改善', completed: false, important: true}
        ]
    },
    {
        id: 'ai-heroes-gym',
        name: 'AIヒーローズジム',
        type: 'AI塗',
        equity: {
            why: 'AIリテラシーを通じた未来を創造する子どもの育成',
            who: '小学生から高校生',
            what: '実践的なAI教育とプログラミング学習',
            how: 'プロジェクトベースの体験型学習とメンタリング'
        },
        awareness: 65, // 認知度（％）
        preference: 90, // 選好度（％）
        strategy: {
            concept: '「AIと共創する未来の創り手」を育てる新時代の学び場',
            positioning: '実践的AI教育に特化した唯一の学習環境',
            uniqueValue: '最新AIツールの実践と創造的プロジェクトの融合',
            targetAudience: '未来技術に興味を持つ子どもと前向きな保護者'
        },
        okrKpi: {
            objective: '子どもたちのAIリテラシーと創造的問題解決能力の向上',
            keyResults: [
                'オリジナルAIプロジェクト完成率80%達成',
                'AI技術理解度テスト平均85点以上',
                'コンテスト・発表会への参加率60%達成'
            ],
            kpis: [
                '新規入会者数：月平均8名',
                '継続率：85%以上',
                '保護者満足度：90%以上'
            ]
        },
        tasks: [
            {id: 1, text: 'カリキュラムの最新AI技術対応更新', completed: false, important: true},
            {id: 2, text: 'プロジェクト発表会の企画', completed: true, important: true},
            {id: 3, text: 'メンター研修の実施', completed: false, important: false},
            {id: 4, text: '保護者向けAI教育セミナーの準備', completed: false, important: true},
            {id: 5, text: '学習進捗管理システムの改善', completed: true, important: false}
        ]
    }
];

// ブランド一覧の表示
function renderBrands() {
    try {
        console.log('ブランド一覧の表示を開始します');
        
        const container = document.getElementById('brands-container');
        if (!container) {
            console.error('ブランドコンテナが見つかりません');
            return;
        }
        
        // 一覧をクリア
        container.innerHTML = '';
        
        // データがなければサンプルデータを使用
        if (!brandsData || brandsData.length === 0) {
            console.log('ブランドデータがないため、サンプルデータを使用します');
            brandsData = createSampleData();
            saveDataToLocalStorage();
        }
        
        // 各ブランドのカードを作成
        brandsData.forEach(brand => {
            try {
                const brandCard = createBrandCard(brand);
                container.appendChild(brandCard);
            } catch (error) {
                console.error(`ブランド(ID: ${brand.id})のカード作成中にエラーが発生しました:`, error);
            }
        });
        
        // 新規ブランド追加ボタン
        const addButtonContainer = document.createElement('div');
        addButtonContainer.className = 'add-brand-container';
        addButtonContainer.innerHTML = `
            <button id="add-brand-btn" class="add-brand-btn">
                <i class="fas fa-plus"></i> 新しいブランドを追加
            </button>
        `;
        container.appendChild(addButtonContainer);
        
        // 新規ブランド追加ボタンのイベントリスナー
        document.getElementById('add-brand-btn').addEventListener('click', function() {
            // 新規ブランド作成処理
            createNewBrand();
        });
        
        console.log('ブランド一覧の表示が完了しました');
    } catch (error) {
        console.error('ブランド一覧の表示中にエラーが発生しました:', error);
    }
}

// ブランドカードの作成
function createBrandCard(brand) {
    const brandCard = document.createElement('div');
    brandCard.className = 'brand-card';
    brandCard.id = brand.id;

    // ブランドヘッダー
    const brandHeader = document.createElement('div');
    brandHeader.className = 'brand-header';
    
    const nameElement = document.createElement('h3');
    nameElement.className = 'brand-name handwritten';
    nameElement.textContent = brand.name || 'ブランド名なし';
    
    const typeElement = document.createElement('span');
    typeElement.className = 'brand-type';
    typeElement.textContent = brand.type || 'タイプ未設定';
    
    brandHeader.appendChild(nameElement);
    brandHeader.appendChild(typeElement);
    
    // 編集ボタン
    const editButton = document.createElement('button');
    editButton.className = 'edit-button';
    editButton.textContent = '編集';
    editButton.dataset.brandId = brand.id;
    
    // 編集ボタンのクリックイベント
    editButton.addEventListener('click', function() {
        const brandId = this.dataset.brandId;
        showBrandEditModal(brandId);
    });
    
    brandHeader.appendChild(editButton);
    brandCard.appendChild(brandHeader);
    
    // ブランドグリッド（コンテンツ部分）
    const grid = document.createElement('div');
    grid.className = 'brand-grid';
    
    // エクイティセクション
    const equitySection = createSection('ブランドエクイティ');
    const equityContent = document.createElement('div');
    equityContent.className = 'section-content';
    
    if (brand.equity) {
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
    } else {
        equityContent.innerHTML = '<p>エクイティデータがありません</p>';
    }
    
    equitySection.appendChild(equityContent);
    grid.appendChild(equitySection);
    
    // 戦略セクション
    const strategySection = createSection('マーケティング戦略');
    const strategyContent = document.createElement('div');
    strategyContent.className = 'section-content';
    
    if (brand.strategy) {
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
    } else {
        strategyContent.innerHTML = '<p>戦略データがありません</p>';
    }
    
    strategySection.appendChild(strategyContent);
    grid.appendChild(strategySection);
    
    // OKR/KPIセクション
    const okrSection = createSection('OKR・KPI');
    const okrContent = document.createElement('div');
    okrContent.className = 'section-content';
    
    if (brand.okrKpi) {
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
    } else {
        okrContent.innerHTML = '<p>OKR・KPIデータがありません</p>';
    }
    
    okrSection.appendChild(okrContent);
    grid.appendChild(okrSection);
    
    // タスクセクション
    const tasksSection = createSection('タスク一覧');
    const tasksContent = document.createElement('div');
    tasksContent.className = 'section-content';
    
    if (brand.tasks && brand.tasks.length > 0) {
        const tasksList = document.createElement('ul');
        tasksList.className = 'task-list';
        
        brand.tasks.forEach(task => {
            const taskItem = document.createElement('li');
            taskItem.className = 'task-item';
            if (task.completed) {
                taskItem.classList.add('completed');
            }
            if (task.important) {
                taskItem.classList.add('important');
            }
            
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
            
            tasksList.appendChild(taskItem);
        });
        
        tasksContent.appendChild(tasksList);
    } else {
        tasksContent.innerHTML = '<p>タスクがありません</p>';
    }
    
    tasksSection.appendChild(tasksContent);
    grid.appendChild(tasksSection);
    
    brandCard.appendChild(grid);
    return brandCard;
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

// 新規ブランド作成処理
async function createNewBrand() {
    try {
        console.log('新規ブランドの作成を開始します');
        
        // 新しいブランドIDを生成
        let maxId = 0;
        brandsData.forEach(brand => {
            const numId = parseInt(brand.id);
            if (!isNaN(numId)) {
                maxId = Math.max(maxId, numId);
            }
        });
        
        const newId = maxId + 1;
        
        // 新規ブランドの雛形を作成
        const newBrand = {
            id: newId,
            name: '新しいブランド',
            type: '未設定',
            equity: {
                why: '',
                who: '',
                what: '',
                how: ''
            },
            strategy: {
                concept: '',
                positioning: '',
                uniqueValue: '',
                targetAudience: ''
            },
            okrKpi: {
                objective: '',
                keyResults: [],
                kpis: []
            },
            tasks: []
        };
        
        // ブランドリストに追加
        brandsData.push(newBrand);
        
        // データを保存
        saveDataToLocalStorage();
        // Supabase にブランドを追加
        if (!isLocalStorageMode()) {
            try {
                const { data: added, error } = await addBrand(newBrand);
                if (error) {
                    console.error('Supabaseブランド追加エラー:', error);
                } else if (added && added.length > 0) {
                    // 返却された ID で置き換え
                    brandsData[brandsData.length - 1] = added[0];
                    saveDataToLocalStorage();
                }
            } catch (err) {
                console.error('addBrand 処理中にエラー:', err);
            }
        }
        
        // 表示を更新
        renderBrands();
        renderBrandTasksUI();
        
        // 通知を表示
        showNotification('新しいブランドを作成しました');
        
        // 新しいブランドカードにスクロール
        const newCard = document.getElementById(newId);
        if (newCard) {
            newCard.scrollIntoView({ behavior: 'smooth' });
            
            // 編集モードを自動的に開始
            setTimeout(() => {
                const editButton = newCard.querySelector('.edit-button');
                if (editButton) {
                    editButton.click();
                }
            }, 500);
        }
        
        console.log('新規ブランドの作成が完了しました');
    } catch (error) {
        console.error('新規ブランドの作成中にエラーが発生しました:', error);
    }
}

// 通知表示関数
function showNotification(message, duration = 3000) {
    try {
        const notification = document.getElementById('notification');
        notification.textContent = message;
        notification.classList.add('show');
        
        // 一定時間後に通知を非表示
        setTimeout(() => {
            notification.classList.remove('show');
        }, duration);
    } catch (error) {
        console.error('通知表示中にエラーが発生しました:', error);
    }
}

// ブランドタスク一覧を表示する関数
function renderBrandTasksUI(filter = 'all') {
    try {
        console.log('ブランドタスクUIのレンダリング中:', filter);
        const container = document.getElementById('brand-tasks-container');
        if (!container) {
            console.error('brand-tasks-containerが見つかりません');
            return;
        }
        // グリッドレイアウトを適用
        container.classList.add('brand-task-grid');
        // 古いコンテンツをクリア
        container.innerHTML = '';

        // ブランドごとにカードを生成
        brandsData.forEach(brand => {
            // フィルター処理
            let filteredTasks = brand.tasks || [];
            if (filter === 'important') {
                filteredTasks = filteredTasks.filter(task => task.important);
            } else if (filter === 'incomplete') {
                filteredTasks = filteredTasks.filter(task => !task.completed);
            } else if (filter === 'completed') {
                filteredTasks = filteredTasks.filter(task => task.completed);
            }

            // カード作成
            const card = document.createElement('div');
            card.className = 'brand-task-card';
            card.id = `brand-${brand.id}-tasks`;

            // ヘッダー
            const header = document.createElement('div');
            header.className = 'brand-task-header';
            header.innerHTML = `
                <h3>${brand.name || 'ブランド名なし'}</h3>
                <button class="add-task-btn" data-brand-id="${brand.id}"><i class="fas fa-plus"></i> タスク追加</button>
            `;
            card.appendChild(header);

            // タスクリスト
            const ul = document.createElement('ul');
            ul.className = 'tasks-list';
            if (filteredTasks.length > 0) {
                filteredTasks.forEach(task => {
                    const li = document.createElement('li');
                    li.className = 'task-item' + (task.completed ? ' completed' : '') + (task.important ? ' important' : '');
                    li.dataset.taskId = task.id;
                    li.dataset.brandId = brand.id;
                    li.innerHTML = `
                        <div class="task-checkbox-container">
                            <input type="checkbox" class="task-checkbox" data-task-id="${task.id}" data-brand-id="${brand.id}" ${task.completed ? 'checked' : ''}>
                        </div>
                        <span class="task-text">${task.text || ''}</span>
                        <div class="task-actions">
                            <button class="task-delete-btn" data-task-id="${task.id}" data-brand-id="${brand.id}">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    `;
                    ul.appendChild(li);
                });
            } else {
                const li = document.createElement('li');
                li.className = 'empty-task';
                li.textContent = 'このフィルターに該当するタスクはありません';
                ul.appendChild(li);
            }
            card.appendChild(ul);

            // タスク追加エリア
            const inputDiv = document.createElement('div');
            inputDiv.className = 'task-add-input';
            inputDiv.innerHTML = `
                <input type="text" class="new-task-input" placeholder="新しいタスク..." data-brand-id="${brand.id}">
                <button class="submit-task-btn" data-brand-id="${brand.id}"><i class="fas fa-plus"></i></button>
            `;
            card.appendChild(inputDiv);

            container.appendChild(card);
        });

        // イベントリスナー設定
        setupTaskInputListeners();
        setupTaskEventListeners();

        console.log('ブランドタスクUIのレンダリングが完了しました');
    } catch (error) {
        console.error('ブランドタスクUIのレンダリング中にエラーが発生しました:', error);
    }
}

// ページ読み込み完了時に実行する初期化関数
document.addEventListener('DOMContentLoaded', async function() {
    console.log('ページが読み込まれました。初期化を開始します。');

    // 初期サンプルデータを保持（元のbrandsDataの値）
    const defaultBrands = [...brandsData];
    console.log('デフォルトブランドデータを保持:', defaultBrands.length, '件');

    if (isLocalStorageMode()) {
        // localStorage モード
        const storedData = localStorage.getItem('brandsData');
        if (storedData) {
            try {
                brandsData = JSON.parse(storedData);
                console.log('ローカルストレージからデータを読み込みました:', brandsData.length + '件');
            } catch (error) {
                console.error('ローカルストレージのデータ解析エラー:', error);
                console.log('代わりにデフォルトデータを使用します');
                brandsData = defaultBrands;
            }
        } else {
            console.log('ローカルストレージにデータがないため、デフォルトデータを使用します');
            brandsData = defaultBrands;
        }
    } else {
        // Supabase モード
        try {
            // Supabaseからブランドデータを取得
            const { data, error } = await fetchBrands();
            if (error) throw error;
            
            if (data && data.length > 0) {
                // Supabaseから取得したデータ
                const supabaseBrands = data;
                console.log('Supabaseからブランドデータを取得:', supabaseBrands.length, '件');
                
                // 確実にデフォルトデータを使用
                brandsData = [...defaultBrands];
                
                // Supabaseデータを追加（IDが重複しないもののみ）
                const existingIds = brandsData.map(b => b.id.toString());
                for (const brand of supabaseBrands) {
                    if (!existingIds.includes(brand.id.toString())) {
                        brandsData.push(brand);
                        existingIds.push(brand.id.toString());
                    }
                }
                
                console.log('最終的なブランド総数:', brandsData.length, '件');
            } else {
                console.log('Supabaseにブランドデータがないため、デフォルトデータのみ使用します');
                brandsData = defaultBrands;
            }
            
            // 各ブランドのタスクを取得
            const brandsCopy = [...brandsData]; // 元の配列をコピー
            for (const brand of brandsCopy) {
                const { data: tasks, error: taskErr } = await fetchTasks(brand.id);
                if (!taskErr && tasks && tasks.length > 0) {
                    // 該当するブランドオブジェクトを探して更新
                    const brandToUpdate = brandsData.find(b => b.id.toString() === brand.id.toString());
                    if (brandToUpdate) {
                        brandToUpdate.tasks = tasks;
                        console.log(`Brand ${brand.id} のタスクを ${tasks.length} 件取得`);
                    }
                } else {
                    console.log(`Brand ${brand.id} にタスクがないか、エラーが発生しました`);
                }
            }
        } catch (err) {
            console.error('Supabaseからのデータ読み込みに失敗:', err);
            console.log('デフォルトデータを使用します');
            brandsData = defaultBrands;
        }
    }
    
    // キャッシュ問題を回避するために、少し遅延してから表示処理を実行
    setTimeout(() => {
        // 表示処理
        console.log('表示処理を開始します。ブランド数:', brandsData.length);
        renderBrands();
        renderBrandTasksUI();
        
        // フィルターボタン設定
        document.querySelectorAll('.filter-btn').forEach(button => {
            button.addEventListener('click', function() {
                renderBrandTasksUI(this.dataset.filter);
            });
        });
    
        // 全体タスク追加ボタン
        const addTaskBtn = document.getElementById('add-task-btn');
        if (addTaskBtn) {
            addTaskBtn.addEventListener('click', () => {
                const firstInput = document.querySelector('.new-task-input');
                if (firstInput) firstInput.focus();
            });
        }
        
        // ヘッダーにログアウトボタンを追加
        const header = document.querySelector('header');
        if (header && !document.querySelector('.logout-button')) {
            const logoutBtn = document.createElement('button');
            logoutBtn.textContent = 'ログアウト';
            logoutBtn.classList.add('logout-button');
            logoutBtn.addEventListener('click', async function() {
                try {
                    if (confirm('ログアウトしますか？')) {
                        if (typeof signOut === 'function') {
                            const { error } = await signOut();
                            if (error) {
                                console.error('ログアウトエラー:', error);
                                return;
                            }
                            localStorage.removeItem('isLoggedIn');
                            localStorage.removeItem('useLocalStorage');
                            location.reload();
                        } else {
                            console.error('signOut 関数が見つかりません');
                        }
                    }
                } catch (err) {
                    console.error('ログアウト処理でエラー:', err);
                }
            });
            header.appendChild(logoutBtn);
            console.log('ログアウトボタンを追加しました');
        }
    
        console.log('初期化が完了しました');
    }, 100);
});

// ブランド編集の保存
async function saveBrandEdits(brandId) {
    try {
        console.log(`ブランド編集の保存: ${brandId}`);
        
        // データを保存
        saveDataToLocalStorage();
        // Supabase に更新を同期
        if (!isLocalStorageMode()) {
            try {
                const brand = getBrandById(brandId);
                if (brand) {
                    const { data, error } = await saveBrandToSupabase(brand);
                    if (error) {
                        console.error('Supabase ブランド更新エラー:', error);
                    }
                }
            } catch (err) {
                console.error('saveBrandToSupabase 処理中にエラー:', err);
            }
        }
        
        // ブランドカードを更新
        renderBrands();
        
        // ブランドタスク一覧も更新
        renderBrandTasksUI(currentTaskFilter);
        
        // 通知を表示
        const brand = getBrandById(brandId);
        if (brand) {
            showNotification(`「${brand.name}」の情報を更新しました`);
        } else {
            showNotification('ブランド情報を更新しました');
        }
        
        console.log('ブランド編集の保存が完了しました');
    } catch (error) {
        console.error('ブランド編集の保存中にエラーが発生しました:', error);
    }
}

// ID からブランドを取得する関数
function getBrandById(brandId) {
    return brandsData.find(brand => brand.id.toString() === brandId.toString());
}

// フィルターボタンのイベントリスナー
let currentTaskFilter = 'all';
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.filter-btn').forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.dataset.filter;
            renderBrandTasksUI(filter);
        });
    });
});

// ブランド編集モーダルを表示
function showBrandEditModal(brandId) {
    try {
        // ブランドを取得
        const brand = brandsData.find(b => b.id.toString() === brandId.toString());
        if (!brand) {
            console.error(`ブランドが見つかりません: ${brandId}`);
            return;
        }
        
        // モーダル要素の作成
        const modalOverlay = document.createElement('div');
        modalOverlay.className = 'modal-overlay';
        
        const modalContent = document.createElement('div');
        modalContent.className = 'modal-content brand-edit-modal';
        
        // モーダルヘッダー
        const modalHeader = document.createElement('div');
        modalHeader.className = 'modal-header';
        modalHeader.innerHTML = `
            <h2>ブランド編集: ${brand.name}</h2>
            <span class="close-modal">&times;</span>
        `;
        
        // 編集フォーム
        const form = document.createElement('form');
        form.className = 'brand-edit-form';
        form.innerHTML = `
            <div class="form-group">
                <label for="brand-name">ブランド名</label>
                <input type="text" id="brand-name" name="name" value="${brand.name || ''}" required>
            </div>
            <div class="form-group">
                <label for="brand-type">タイプ</label>
                <input type="text" id="brand-type" name="type" value="${brand.type || ''}">
            </div>
            
            <h3>ブランドエクイティ</h3>
            <div class="form-group">
                <label for="brand-why">Why</label>
                <textarea id="brand-why" name="why">${brand.equity?.why || ''}</textarea>
            </div>
            <div class="form-group">
                <label for="brand-who">Who</label>
                <textarea id="brand-who" name="who">${brand.equity?.who || ''}</textarea>
            </div>
            <div class="form-group">
                <label for="brand-what">What</label>
                <textarea id="brand-what" name="what">${brand.equity?.what || ''}</textarea>
            </div>
            <div class="form-group">
                <label for="brand-how">How</label>
                <textarea id="brand-how" name="how">${brand.equity?.how || ''}</textarea>
            </div>
            
            <h3>戦略</h3>
            <div class="form-group">
                <label for="brand-concept">コンセプト</label>
                <textarea id="brand-concept" name="concept">${brand.strategy?.concept || ''}</textarea>
            </div>
            <div class="form-group">
                <label for="brand-positioning">ポジショニング</label>
                <textarea id="brand-positioning" name="positioning">${brand.strategy?.positioning || ''}</textarea>
            </div>
            <div class="form-group">
                <label for="brand-unique-value">独自価値</label>
                <textarea id="brand-unique-value" name="uniqueValue">${brand.strategy?.uniqueValue || ''}</textarea>
            </div>
            <div class="form-group">
                <label for="brand-target-audience">対象顧客</label>
                <textarea id="brand-target-audience" name="targetAudience">${brand.strategy?.targetAudience || ''}</textarea>
            </div>
            
            <h3>OKR・KPI</h3>
            <div class="form-group">
                <label for="brand-objective">目標</label>
                <textarea id="brand-objective" name="objective">${brand.okrKpi?.objective || ''}</textarea>
            </div>
            <div class="form-group">
                <label for="brand-keyresults">主要成果 (改行区切り)</label>
                <textarea id="brand-keyresults" name="keyResults">${(brand.okrKpi?.keyResults || []).join('\n')}</textarea>
            </div>
            <div class="form-group">
                <label for="brand-kpis">KPI (改行区切り)</label>
                <textarea id="brand-kpis" name="kpis">${(brand.okrKpi?.kpis || []).join('\n')}</textarea>
            </div>
            
            <div class="form-action">
                <button type="submit" class="save-button">保存</button>
                <button type="button" class="cancel-button">キャンセル</button>
            </div>
        `;
        
        // 保存ボタンのイベント
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // フォームデータの取得
            const formData = new FormData(form);
            
            // ブランドデータの更新
            brand.name = formData.get('name');
            brand.type = formData.get('type');
            
            if (!brand.equity) brand.equity = {};
            brand.equity.why = formData.get('why');
            brand.equity.who = formData.get('who');
            brand.equity.what = formData.get('what');
            brand.equity.how = formData.get('how');
            
            if (!brand.strategy) brand.strategy = {};
            brand.strategy.concept = formData.get('concept');
            brand.strategy.positioning = formData.get('positioning');
            brand.strategy.uniqueValue = formData.get('uniqueValue');
            brand.strategy.targetAudience = formData.get('targetAudience');
            
            if (!brand.okrKpi) brand.okrKpi = {};
            brand.okrKpi.objective = formData.get('objective');
            // KeyResults と KPIs は改行で分割して配列として保存
            brand.okrKpi.keyResults = formData.get('keyResults').split('\n').map(s => s.trim()).filter(s => s);
            brand.okrKpi.kpis = formData.get('kpis').split('\n').map(s => s.trim()).filter(s => s);
            
            // データを保存
            saveDataToLocalStorage();
            
            // 表示を更新
            renderBrands();
            renderBrandTasksUI(); // タスクリストも更新
            
            // モーダルを閉じる
            document.body.removeChild(modalOverlay);
            
            // 通知を表示
            showNotification(`ブランド「${brand.name}」を更新しました`);
        });
        
        // キャンセルボタンのイベント
        form.querySelector('.cancel-button').addEventListener('click', function() {
            document.body.removeChild(modalOverlay);
        });
        
        // 閉じるボタンのイベント
        modalHeader.querySelector('.close-modal').addEventListener('click', function() {
            document.body.removeChild(modalOverlay);
        });
        
        // モーダルの組み立て
        modalContent.appendChild(modalHeader);
        modalContent.appendChild(form);
        modalOverlay.appendChild(modalContent);
        
        // モーダルを表示
        document.body.appendChild(modalOverlay);
        
    } catch (error) {
        console.error('ブランド編集モーダルの表示中にエラーが発生しました:', error);
    }
}

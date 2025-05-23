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
            targetAudience: '好奇心旺盛で体験的な学びを求める家族',
            awarenessDaily: '',
            awarenessOther: '',
            preferenceDaily: '',
            preferenceOther: '',
            netService: ''
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

// タスクフィルター用の変数（グローバルスコープ）
let currentTaskFilter = 'all';

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
        // 売上公式を冒頭に表示
        strategyContent.innerHTML += `<div class="strategy-formula"><strong>公式: </strong>プレファランス（好感度）✖︎認知度✖︎配下率＝売上</div>`;
        
        // 認知度アップシステム
        strategyContent.innerHTML += `<div class="strategy-item"><span class="strategy-label">認知度アップシステム:</span></div>`;
        strategyContent.innerHTML += `<div class="strategy-sub-item"><span class="strategy-sublabel">毎日の仕組み:</span> ${brand.strategy.awarenessDaily || '未設定'}</div>`;
        strategyContent.innerHTML += `<div class="strategy-sub-item"><span class="strategy-sublabel">他の仕組み:</span> ${brand.strategy.awarenessOther || '未設定'}</div>`;
        
        // プレファランスを上げる仕組み
        strategyContent.innerHTML += `<div class="strategy-item"><span class="strategy-label">プレファランスを上げる仕組み:</span></div>`;
        strategyContent.innerHTML += `<div class="strategy-sub-item"><span class="strategy-sublabel">毎日の仕組み:</span> ${brand.strategy.preferenceDaily || '未設定'}</div>`;
        strategyContent.innerHTML += `<div class="strategy-sub-item"><span class="strategy-sublabel">他の仕組み:</span> ${brand.strategy.preferenceOther || '未設定'}</div>`;
        
        // ネットサービス展開
        strategyContent.innerHTML += `<div class="strategy-item"><span class="strategy-label">ネットサービス展開（配下率）:</span> ${brand.strategy.netService || '未設定'}</div>`;
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
                awarenessDaily: '',
                awarenessOther: '',
                preferenceDaily: '',
                preferenceOther: '',
                netService: ''
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
        // 現在のフィルターを保存
        currentTaskFilter = filter;
        
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
        
        // 重要: 削除ボタンのイベントリスナーを確実に設定
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
                    // 共通のdeleteTask関数を呼び出し
                    if (typeof window.deleteTask === 'function') {
                        window.deleteTask(taskId, brandId);
                    } else if (typeof deleteTask === 'function') {
                        deleteTask(taskId, brandId);
                    } else {
                        console.error('deleteTask関数が見つかりません');
                        alert('システムエラー: タスク削除機能が利用できません');
                    }
                }
            });
        });
        
        // その他のタスクイベントリスナーを設定
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
                // Supabeseデータをパース
                const supabaseBrands = data.map(brand => {
                    try {
                        console.log('取得したブランド生データ:', brand.id, brand);
                        
                        // JSON文字列をオブジェクトに変換
                        const parsedBrand = {
                            ...brand,
                            equity: typeof brand.equity === 'string' ? JSON.parse(brand.equity) : brand.equity,
                            strategy: typeof brand.strategy === 'string' ? JSON.parse(brand.strategy) : brand.strategy,
                            okrKpi: brand.okr_kpi ? 
                                (typeof brand.okr_kpi === 'string' ? JSON.parse(brand.okr_kpi) : brand.okr_kpi) : 
                                {}
                        };
                        
                        console.log('パース後のブランドデータ:', brand.id, parsedBrand);
                        return parsedBrand;
                    } catch (e) {
                        console.error('ブランドデータのパースエラー:', e, brand);
                        return brand;
                    }
                });
                console.log('Supabaseからブランドデータを取得:', supabaseBrands.length, '件');
                
                // ブランドデータのマージ戦略を変更
                // まずIDをキーとするマップを作成
                const brandMap = new Map();
                
                // デフォルトブランドをマップに追加
                defaultBrands.forEach(brand => {
                    brandMap.set(brand.id.toString(), { ...brand, isDefault: true });
                });
                
                // Supabaseのブランドで更新または追加
                supabaseBrands.forEach(brand => {
                    if (brand.id) {
                        // 既存のデフォルトブランドがあれば上書き
                        if (brandMap.has(brand.id.toString())) {
                            const existingBrand = brandMap.get(brand.id.toString());
                            // タスクを保持
                            const tasks = existingBrand.tasks || [];
                            
                            // 完全に新しいデータで上書き
                            brandMap.set(brand.id.toString(), {
                                ...brand,
                                // タスクは保持
                                tasks: tasks
                            });
                            
                            console.log(`ブランド ${brand.id} を上書き更新しました`);
                        } else {
                            // 新規追加
                            brandMap.set(brand.id.toString(), { ...brand, tasks: [] });
                            console.log(`新規ブランド ${brand.id} を追加しました`);
                        }
                    }
                });
                
                // マップから配列に戻す
                brandsData = Array.from(brandMap.values());
                console.log('ブランドデータのマージ完了:', brandsData.length, '件');
            } else {
                console.log('Supabaseにブランドデータがないため、デフォルトデータのみ使用します');
                brandsData = defaultBrands;
            }
            
            // 各ブランドのタスクを取得
            console.log('ブランドのタスクデータを取得中...');
            const brandsCopy = [...brandsData]; // 元の配列をコピー
            for (const brand of brandsCopy) {
                try {
                    const { data: tasks, error: taskErr } = await fetchTasks(brand.id);
                    
                    if (taskErr) {
                        console.error(`ブランド ${brand.id} のタスク取得エラー:`, taskErr);
                        continue;
                    }
                    
                    if (tasks && tasks.length > 0) {
                        // 該当するブランドオブジェクトを探して更新
                        const brandToUpdate = brandsData.find(b => b.id.toString() === brand.id.toString());
                        if (brandToUpdate) {
                            console.log(`ブランド ${brand.id} のタスクデータ取得:`, tasks.length, '件');
                            
                            // 完全にタスクを置き換え
                            brandToUpdate.tasks = [...tasks];
                            console.log(`ブランド ${brand.id} のタスクを ${tasks.length} 件設定`);
                        }
                    } else {
                        console.log(`ブランド ${brand.id} にはタスクがありません`);
                        
                        // 空の配列を設定
                        const brandToUpdate = brandsData.find(b => b.id.toString() === brand.id.toString());
                        if (brandToUpdate) {
                            brandToUpdate.tasks = [];
                        }
                    }
                } catch (taskError) {
                    console.error(`ブランド ${brand.id} のタスクデータ取得中にエラー:`, taskError);
                }
            }
            
            // 最終的なデータをローカルストレージにも保存
            console.log('データ取得完了、ローカルストレージに保存します');
            saveDataToLocalStorage();
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
        console.log(`ブランド編集の保存を開始: ${brandId}`);
        
        const brand = getBrandById(brandId);
        if (!brand) {
            console.error(`ブランドが見つかりません: ${brandId}`);
            return false;
        }
        
        console.log('保存するブランドデータ:', JSON.stringify({
            id: brand.id, 
            name: brand.name,
            type: brand.type,
            equity: brand.equity,
            strategy: brand.strategy,
            okrKpi: brand.okrKpi
        }, null, 2));
        
        // まずローカルに保存
        saveDataToLocalStorage();
        console.log('ローカルストレージに保存しました');
        
        // Supabase への保存処理
        if (!isLocalStorageMode()) {
            try {
                console.log('Supabaseに保存を開始します');
                
                // JSONデータを適切に処理
                const brandCopy = JSON.parse(JSON.stringify(brand)); // ディープコピー
                // タスクは別テーブルで管理するため削除
                const tasks = [...(brandCopy.tasks || [])];
                delete brandCopy.tasks;
                
                // Supabaseスキーマに合わせて変換
                const supabaseBrand = {
                    id: brandCopy.id,
                    name: brandCopy.name,
                    type: brandCopy.type,
                    equity: JSON.stringify(brandCopy.equity || {}),
                    strategy: JSON.stringify(brandCopy.strategy || {}),
                    okr_kpi: JSON.stringify(brandCopy.okrKpi || {}),
                    awareness: brandCopy.awareness || 0,
                    preference: brandCopy.preference || 0
                };
                
                console.log('Supabase形式に変換:', supabaseBrand);
                console.log('変換前のokrKpi:', brandCopy.okrKpi);
                console.log('変換後のokr_kpi:', supabaseBrand.okr_kpi);
                
                // APIリクエストとレスポンスの詳細をログ
                console.log('Supabase APIリクエスト:', 
                    'URL:', supabase.supabaseUrl, 
                    'テーブル:', 'brands', 
                    'ID:', brand.id
                );
                
                // Supabaseに保存
                const { data, error } = await supabase
                    .from('brands')
                    .update(supabaseBrand)
                    .eq('id', brand.id)
                    .select();
                
                if (error) {
                    console.error('保存エラー:', error);
                    alert('データの保存に失敗しました: ' + error.message);
                    return false;
                }
                
                console.log('Supabaseに保存成功:', data);
                
                // タスクの同期
                if (tasks && tasks.length > 0) {
                    console.log(`${tasks.length}件のタスクを同期します`);
                    
                    try {
                        // 既存のタスクをすべて削除
                        const { error: deleteError } = await supabase
                            .from('tasks')
                            .delete()
                            .eq('brand_id', brand.id);
                            
                        if (deleteError) {
                            console.error('タスク削除エラー:', deleteError);
                        } else {
                            // 新しいタスクをすべて追加
                            const tasksToInsert = tasks.map(task => ({
                                brand_id: brand.id,
                                text: task.text,
                                completed: task.completed,
                                important: task.important
                            }));
                            
                            const { data: insertedTasks, error: insertError } = await supabase
                                .from('tasks')
                                .insert(tasksToInsert)
                                .select();
                                
                            if (insertError) {
                                console.error('タスク追加エラー:', insertError);
                            } else {
                                console.log('タスクを保存しました:', insertedTasks);
                                
                                // 新しいIDをタスクに設定
                                if (insertedTasks && insertedTasks.length > 0) {
                                    // Supabaseから返されたIDを使用
                                    brand.tasks = insertedTasks;
                                    saveDataToLocalStorage();
                                }
                            }
                        }
                    } catch (taskErr) {
                        console.error('タスク同期中にエラー:', taskErr);
                    }
                }
                
                // 保存完了後に少し待機
                await new Promise(resolve => setTimeout(resolve, 300));
            } catch (err) {
                console.error('Supabase通信中にエラーが発生:', err);
                alert('通信エラーが発生しました: ' + err.message);
                return false;
            }
        }
        
        // 表示を更新
        renderBrands();
        renderBrandTasksUI(currentTaskFilter);
        
        // 通知を表示
        showNotification(`「${brand.name}」の情報を更新しました`);
        
        console.log('ブランド編集の保存が完了しました');
        return true;
    } catch (error) {
        console.error('ブランド編集の保存でエラー発生:', error);
        alert('保存処理中にエラーが発生しました: ' + error.message);
        return false;
    }
}

// ID からブランドを取得する関数
function getBrandById(brandId) {
    return brandsData.find(brand => brand.id.toString() === brandId.toString());
}

// フィルターボタンのイベントリスナー
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
            <div class="form-group strategy-formula">
                <label>公式: プレファランス（好感度）✖︎認知度✖︎配下率＝売上</label>
            </div>
            
            <h4>認知度アップシステム（ブランドエクイティを本能に刺す）</h4>
            <div class="form-group">
                <label for="brand-awareness-daily">毎日の仕組み</label>
                <textarea id="brand-awareness-daily" name="awarenessDaily">${brand.strategy?.awarenessDaily || ''}</textarea>
            </div>
            <div class="form-group">
                <label for="brand-awareness-other">他の仕組み</label>
                <textarea id="brand-awareness-other" name="awarenessOther">${brand.strategy?.awarenessOther || ''}</textarea>
            </div>
            
            <h4>プレファランスを上げる仕組み</h4>
            <div class="form-group">
                <label for="brand-preference-daily">毎日の仕組み</label>
                <textarea id="brand-preference-daily" name="preferenceDaily">${brand.strategy?.preferenceDaily || ''}</textarea>
            </div>
            <div class="form-group">
                <label for="brand-preference-other">他の仕組み</label>
                <textarea id="brand-preference-other" name="preferenceOther">${brand.strategy?.preferenceOther || ''}</textarea>
            </div>
            
            <div class="form-group">
                <label for="brand-net-service">ネットサービス展開（配下率）</label>
                <textarea id="brand-net-service" name="netService">${brand.strategy?.netService || ''}</textarea>
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
            
            <h3>タスク一覧</h3>
            <div class="tasks-edit-container" id="tasks-edit-container-${brand.id}">
                <div class="task-header">
                    <span>タスク内容</span>
                    <span class="checkbox-label">完了</span>
                    <span class="checkbox-label">重要</span>
                    <span>操作</span>
                </div>
                <div class="tasks-edit-list">
                    ${(brand.tasks || []).map((task, index) => `
                        <div class="task-edit-row" data-task-id="${task.id}" data-index="${index}">
                            <input type="text" name="task-text-${index}" value="${task.text || ''}" class="task-text-input">
                            <input type="checkbox" name="task-completed-${index}" ${task.completed ? 'checked' : ''} class="task-checkbox">
                            <input type="checkbox" name="task-important-${index}" ${task.important ? 'checked' : ''} class="task-important">
                            <button type="button" class="task-delete-btn" data-index="${index}">削除</button>
                            <input type="hidden" name="task-id-${index}" value="${task.id}">
                        </div>
                    `).join('')}
                </div>
                <button type="button" class="add-task-btn" data-brand-id="${brand.id}">+ 新しいタスクを追加</button>
            </div>
            
            <div class="form-action">
                <button type="submit" class="save-button">保存</button>
                <button type="button" class="cancel-button">キャンセル</button>
            </div>
        `;
        
        // 保存ボタンのイベント
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // ローディング表示
            const saveButton = form.querySelector('.save-button');
            const originalText = saveButton.textContent;
            saveButton.textContent = '保存中...';
            saveButton.disabled = true;
            
            try {
                // フォームデータの取得
                const formData = new FormData(form);
                
                console.log('フォームデータ取得完了');
                
                // ブランドデータの更新
                brand.name = formData.get('name');
                brand.type = formData.get('type');
                
                if (!brand.equity) brand.equity = {};
                brand.equity.why = formData.get('why');
                brand.equity.who = formData.get('who');
                brand.equity.what = formData.get('what');
                brand.equity.how = formData.get('how');
                
                if (!brand.strategy) brand.strategy = {};
                brand.strategy.awarenessDaily = formData.get('awarenessDaily');
                brand.strategy.awarenessOther = formData.get('awarenessOther');
                brand.strategy.preferenceDaily = formData.get('preferenceDaily');
                brand.strategy.preferenceOther = formData.get('preferenceOther');
                brand.strategy.netService = formData.get('netService');
                
                if (!brand.okrKpi) brand.okrKpi = {};
                brand.okrKpi.objective = formData.get('objective');
                // KeyResults と KPIs は改行で分割して配列として保存
                brand.okrKpi.keyResults = formData.get('keyResults').split('\n').map(s => s.trim()).filter(s => s);
                brand.okrKpi.kpis = formData.get('kpis').split('\n').map(s => s.trim()).filter(s => s);
                
                // タスクデータの処理
                const tasksEditContainer = form.querySelector(`#tasks-edit-container-${brand.id}`);
                const taskRows = tasksEditContainer.querySelectorAll('.task-edit-row');
                
                console.log('タスク行の数:', taskRows.length);
                
                // タスク配列がない場合は初期化
                if (!Array.isArray(brand.tasks)) {
                    brand.tasks = [];
                    console.log('brand.tasks配列を初期化しました');
                }
                
                // 既存のタスクを更新
                const updatedTasks = [];
                taskRows.forEach(row => {
                    if (!row.classList.contains('new-task-row')) {
                        const index = row.getAttribute('data-index');
                        const taskId = formData.get(`task-id-${index}`);
                        const text = formData.get(`task-text-${index}`);
                        const completed = formData.get(`task-completed-${index}`) === 'on';
                        const important = formData.get(`task-important-${index}`) === 'on';
                        
                        if (text && text.trim()) {
                            updatedTasks.push({
                                id: parseInt(taskId) || Math.floor(Math.random() * 10000),
                                text: text.trim(),
                                completed,
                                important
                            });
                            console.log('既存タスク更新:', text.trim());
                        }
                    }
                });
                
                // 新しいタスクを保存
                const newTaskRows = tasksEditContainer.querySelectorAll('.new-task-row');
                console.log('新規タスク行の数:', newTaskRows.length);
                
                // 最大ID値を取得（既存タスクまたは最近追加したタスクから）
                let maxTaskId = 0;
                if (brand.tasks && brand.tasks.length > 0) {
                    brand.tasks.forEach(task => {
                        if (typeof task.id === 'number' && task.id > maxTaskId) {
                            maxTaskId = task.id;
                        }
                    });
                }
                updatedTasks.forEach(task => {
                    if (typeof task.id === 'number' && task.id > maxTaskId) {
                        maxTaskId = task.id;
                    }
                });
                console.log('最大タスクID:', maxTaskId);
                
                newTaskRows.forEach((row, idx) => {
                    const index = row.getAttribute('data-index');
                    console.log(`新規タスク[${idx}]処理中:`, index);
                    
                    const textFieldName = `new-task-text-${index.replace('new-', '')}`;
                    const text = formData.get(textFieldName);
                    console.log('取得したテキスト:', textFieldName, text);
                    
                    const completedFieldName = `new-task-completed-${index.replace('new-', '')}`;
                    const completed = formData.get(completedFieldName) === 'on';
                    
                    const importantFieldName = `new-task-important-${index.replace('new-', '')}`;
                    const important = formData.get(importantFieldName) === 'on';
                    
                    if (text && text.trim()) {
                        // 新しいタスクID
                        const newId = maxTaskId + 1 + idx;
                        
                        updatedTasks.push({
                            id: newId,
                            text: text.trim(),
                            completed,
                            important
                        });
                        console.log('新規タスク追加:', text.trim(), 'ID:', newId);
                    }
                });
                
                // タスク配列を更新
                console.log('更新前のタスク数:', brand.tasks ? brand.tasks.length : 0);
                console.log('更新後のタスク数:', updatedTasks.length);
                
                // 更新されたタスク一覧を表示して確認
                console.log('更新タスク一覧:', JSON.stringify(updatedTasks));
                
                // ブランドのタスク配列を更新
                brand.tasks = updatedTasks;
                
                console.log('ブランドデータ更新完了:', brand.id);
                
                // 必ずローカルストレージには保存
                saveDataToLocalStorage();
                console.log('ローカルストレージに保存しました');
                
                // Supabaseに保存
                if (!isLocalStorageMode()) {
                    // コピーしてtasksプロパティを削除
                    const brandCopy = { ...brand };
                    const tasks = [...brand.tasks]; // 直接brandのタスクを使用
                    delete brandCopy.tasks;
                    
                    // Supabaseスキーマに合わせて変換
                    const supabaseBrand = {
                        id: brandCopy.id,
                        name: brandCopy.name,
                        type: brandCopy.type,
                        equity: JSON.stringify(brandCopy.equity || {}),
                        strategy: JSON.stringify(brandCopy.strategy || {}),
                        okr_kpi: JSON.stringify(brandCopy.okrKpi || {}),
                        awareness: brandCopy.awareness || 0,
                        preference: brandCopy.preference || 0
                    };
                    
                    console.log('Supabase形式に変換:', supabaseBrand);
                    console.log('変換前のokrKpi:', brandCopy.okrKpi);
                    console.log('変換後のokr_kpi:', supabaseBrand.okr_kpi);
                    
                    console.log('Supabaseに保存を開始します');
                    const { data, error } = await supabase
                        .from('brands')
                        .update(supabaseBrand)
                        .eq('id', brand.id)
                        .select();
                    
                    if (error) {
                        console.error('保存エラー:', error);
                        alert('データの保存に失敗しました: ' + error.message);
                    } else {
                        console.log('保存成功:', data);
                        // 再度ローカルストレージも更新
                        saveDataToLocalStorage();
                        
                        // タスクの保存
                        console.log(`${tasks.length}件のタスクを同期します`);
                        
                        try {
                            // 既存のタスクをすべて削除
                            const { error: deleteError } = await supabase
                                .from('tasks')
                                .delete()
                                .eq('brand_id', brand.id);
                                
                            if (deleteError) {
                                console.error('タスク削除エラー:', deleteError);
                            } else {
                                console.log('既存タスクを削除しました');
                                
                                // 新しいタスクが存在する場合のみ追加
                                if (tasks.length > 0) {
                                    // 新しいタスクをすべて追加
                                    const tasksToInsert = tasks.map(task => ({
                                        brand_id: brand.id,
                                        text: task.text,
                                        completed: task.completed,
                                        important: task.important
                                    }));
                                    
                                    console.log('追加するタスク:', tasksToInsert);
                                    
                                    const { data: insertedTasks, error: insertError } = await supabase
                                        .from('tasks')
                                        .insert(tasksToInsert)
                                        .select();
                                        
                                    if (insertError) {
                                        console.error('タスク追加エラー:', insertError);
                                    } else {
                                        console.log('タスクを保存しました:', insertedTasks);
                                        
                                        // 新しいIDをタスクに設定
                                        if (insertedTasks && insertedTasks.length > 0) {
                                            // Supabaseから返されたIDを使用
                                            brand.tasks = insertedTasks;
                                            saveDataToLocalStorage();
                                            console.log('Supabaseから返されたタスクIDで更新しました');
                                        }
                                    }
                                } else {
                                    console.log('追加するタスクがありません');
                                }
                            }
                        } catch (taskErr) {
                            console.error('タスク同期中にエラー:', taskErr);
                        }
                        
                        // モーダルを閉じる前に少し待機して保存を確実にする
                        await new Promise(resolve => setTimeout(resolve, 300));
                    }
                }
                
                // 表示を更新
                renderBrands();
                renderBrandTasksUI(currentTaskFilter);
                
                // モーダルを閉じる
                document.body.removeChild(modalOverlay);
                
                // 通知表示
                showNotification(`ブランド「${brand.name}」を更新しました`);
            } catch (err) {
                console.error('ブランド保存中にエラーが発生:', err);
                alert('保存処理中にエラーが発生しました: ' + err.message);
            } finally {
                // ボタンを元に戻す
                saveButton.textContent = originalText;
                saveButton.disabled = false;
            }
        });
        
        // 新しいタスク追加ボタンのイベント
        const addTaskBtn = form.querySelector('.add-task-btn');
        let newTaskCounter = 0;
        
        addTaskBtn.addEventListener('click', function() {
            const tasksEditList = form.querySelector('.tasks-edit-list');
            const newTaskRow = document.createElement('div');
            newTaskRow.className = 'task-edit-row new-task-row';
            newTaskRow.dataset.index = `new-${newTaskCounter}`;
            
            console.log('新規タスク行を作成します。インデックス:', `new-${newTaskCounter}`);
            
            newTaskRow.innerHTML = `
                <input type="text" name="new-task-text-${newTaskCounter}" class="task-text-input" placeholder="新しいタスク...">
                <input type="checkbox" name="new-task-completed-${newTaskCounter}" class="task-checkbox">
                <input type="checkbox" name="new-task-important-${newTaskCounter}" class="task-important">
                <button type="button" class="task-delete-btn" data-index="new-${newTaskCounter}">削除</button>
            `;
            
            tasksEditList.appendChild(newTaskRow);
            
            // 削除ボタンのイベント
            const deleteBtn = newTaskRow.querySelector('.task-delete-btn');
            deleteBtn.addEventListener('click', function() {
                console.log('新規タスク行を削除します:', this.dataset.index);
                newTaskRow.remove();
            });
            
            // フォーカスを新しい入力欄に
            const textInput = newTaskRow.querySelector('.task-text-input');
            textInput.focus();
            
            // カウンターを増やす
            newTaskCounter++;
            console.log('新規タスクカウンター更新:', newTaskCounter);
        });
        
        // 既存タスクの削除ボタンのイベント
        form.querySelectorAll('.task-delete-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const row = this.closest('.task-edit-row');
                row.remove();
            });
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



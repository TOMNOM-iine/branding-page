console.log('Syntax check');
// ブランドデータ (初期値は空の配列、データベースまたはローカルストレージから読み込みます)
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

// ブランドデータの表示
function renderBrands() {
    try {
        console.log('ブランドデータの表示を開始します。ブランド数:', brandsData.length);
        const container = document.getElementById('brands-container');
        if (!container) {
            console.error('ブランドコンテナが見つかりません');
            return;
        }
        
        container.innerHTML = '';
        
        // データ確認とフォールバック
        if (!brandsData || brandsData.length === 0) {
            console.log('ブランドデータがないため、サンプルデータを使用します');
            brandsData = createSampleData();
            saveDataToLocalStorage();
        }
        
        // ブランドの表示をロギング
        brandsData.forEach((brand, index) => {
            console.log(`ブランド[${index}]: ${brand.name} (ID: ${brand.id})`);
        });
        
        // ブランドカードを作成
        brandsData.forEach(brand => {
            const brandCard = createBrandCard(brand);
            container.appendChild(brandCard);
        });
        
        // 編集ボタンのイベントリスナーを設定
        initEditButtons();
        console.log('ブランドデータの表示を完了しました');
    } catch (error) {
        console.error('ブランド表示時にエラーが発生しました:', error);
        // エラー時にサンプルデータを使用して再表示
        brandsData = createSampleData();
        saveDataToLocalStorage();
        // 少し遅延させて再表示
        setTimeout(() => {
            console.log('エラー後にブランド再表示を試みます');
            renderBrands();
        }, 500);
    }
}

// ブランドカード作成関数
function createBrandCard(brand) {
    const brandCard = document.createElement('div');
    brandCard.className = 'brand-card';
    // IDが文字列の場合と数値の場合の両方をサポート
    brandCard.id = `brand-${brand.id}`;

    // ブランド情報のセクション
    const brandInfo = document.createElement('div');
    brandInfo.className = 'brand-info';

    // ブランド名
    const brandName = document.createElement('h3');
    brandName.className = 'brand-name';
    brandName.textContent = brand.name || 'ブランド名なし';
    brandInfo.appendChild(brandName);

    // 編集ボタン
    const editBtn = document.createElement('button');
    editBtn.className = 'edit-btn';
    editBtn.innerHTML = '<i class="fas fa-edit"></i> 編集';
    editBtn.dataset.brandId = brand.id;
    brandInfo.appendChild(editBtn);

    brandCard.appendChild(brandInfo);

    // コンセプト
    const conceptSection = document.createElement('div');
    conceptSection.className = 'section';
    
    const conceptTitle = document.createElement('h4');
    conceptTitle.textContent = 'コンセプト';
    conceptSection.appendChild(conceptTitle);
    
    const conceptText = document.createElement('p');
    conceptText.className = 'concept-text';
    conceptText.textContent = brand.concept || 'まだ設定されていません';
    conceptSection.appendChild(conceptText);
    
    brandCard.appendChild(conceptSection);

    // ストラテジー
    const strategySection = document.createElement('div');
    strategySection.className = 'section';
    
    const strategyTitle = document.createElement('h4');
    strategyTitle.textContent = 'ストラテジー';
    strategySection.appendChild(strategyTitle);
    
    // strategyがない場合のハンドリングを追加
    const strategyContent = brand.strategy ? createStrategyContent(brand.strategy) : document.createElement('p');
    if (!brand.strategy) {
        strategyContent.textContent = 'ストラテジーがまだ設定されていません';
    }
    strategySection.appendChild(strategyContent);
    
    brandCard.appendChild(strategySection);

    // OKRとKPI
    const okrKpiSection = document.createElement('div');
    okrKpiSection.className = 'section';
    
    const okrKpiTitle = document.createElement('h4');
    okrKpiTitle.textContent = 'OKRとKPI';
    okrKpiSection.appendChild(okrKpiTitle);
    
    // brand.okrKpiがない場合も適切に処理
    const okrKpiContent = createOkrKpiContent(brand.okrKpi);
    okrKpiSection.appendChild(okrKpiContent);
    
    brandCard.appendChild(okrKpiSection);

    return brandCard;
}

// ストラテジーコンテンツ作成
function createStrategyContent(strategy) {
    const container = document.createElement('div');
    container.className = 'strategy-content';
    
    // strategyが未定義の場合のチェック
    if (!strategy) {
        const noDataMessage = document.createElement('p');
        noDataMessage.textContent = 'ストラテジーが設定されていません';
        container.appendChild(noDataMessage);
        return container;
    }
    
    // エレベーターピッチ
    container.appendChild(
        createStrategyItem('elevator-pitch', 'エレベーターピッチ', strategy.elevatorPitch || 'まだ設定されていません')
    );
    
    // ユーザー定義
    container.appendChild(
        createStrategyItem('user-definition', 'ユーザー定義', strategy.userDefinition || 'まだ設定されていません')
    );
    
    // 市場規模
    container.appendChild(
        createStrategyItem('market-size', '市場規模', strategy.marketSize || 'まだ設定されていません')
    );
    
    // 競合
    container.appendChild(
        createStrategyItem('competition', '競合', strategy.competition || 'まだ設定されていません')
    );
    
    // 差別化要因
    container.appendChild(
        createStrategyItem('differentiators', '差別化要因', strategy.differentiators || 'まだ設定されていません')
    );
    
    // マーケティング戦略
    container.appendChild(
        createStrategyItem('marketing-strategy', 'マーケティング戦略', strategy.marketingStrategy || 'まだ設定されていません')
    );
    
    return container;
}

// 戦略項目を作成
function createStrategyItem(className, label, value) {
    const item = document.createElement('div');
    item.className = 'strategy-item';
    
    const labelSpan = document.createElement('span');
    labelSpan.className = 'strategy-label handwritten';
    labelSpan.textContent = label + ':';
    
    const valueSpan = document.createElement('span');
    valueSpan.className = 'strategy-' + className;
    valueSpan.textContent = value;
    
    item.appendChild(labelSpan);
    item.appendChild(valueSpan);
    
    return item;
}

// OKRとKPIのコンテンツを作成
function createOkrKpiContent(okrKpi) {
    const container = document.createElement('div');
    
    // okrKpiがない場合は空のコンテナを返す
    if (!okrKpi) {
        console.log('OKR/KPIデータがありません');
        const noDataMessage = document.createElement('p');
        noDataMessage.textContent = 'OKR/KPIデータが設定されていません';
        container.appendChild(noDataMessage);
        return container;
    }
    
    // 目標
    const objectiveItem = document.createElement('div');
    objectiveItem.className = 'okr-item';
    
    const objectiveLabel = document.createElement('span');
    objectiveLabel.className = 'okr-label handwritten';
    objectiveLabel.textContent = '目標:';
    
    const objectiveValue = document.createElement('span');
    objectiveValue.className = 'okrKpi-objective'; // 編集用クラスを追加
    objectiveValue.textContent = okrKpi.objective || 'まだ設定されていません';
    
    objectiveItem.appendChild(objectiveLabel);
    objectiveItem.appendChild(objectiveValue);
    container.appendChild(objectiveItem);
    
    // 主要結果
    const krLabel = document.createElement('div');
    krLabel.className = 'okr-label handwritten';
    krLabel.textContent = '主要結果:';
    container.appendChild(krLabel);
    
    const krList = document.createElement('ul');
    krList.className = 'key-results-list'; // 編集用クラスを追加
    if (Array.isArray(okrKpi.keyResults)) {
        okrKpi.keyResults.forEach(kr => {
            const krItem = document.createElement('li');
            krItem.textContent = kr;
            krList.appendChild(krItem);
        });
    } else {
        const krItem = document.createElement('li');
        krItem.textContent = 'まだ設定されていません';
        krList.appendChild(krItem);
    }
    container.appendChild(krList);
    
    // KPI
    const kpiLabel = document.createElement('div');
    kpiLabel.className = 'okr-label handwritten';
    kpiLabel.textContent = 'KPI:';
    container.appendChild(kpiLabel);
    
    const kpiList = document.createElement('ul');
    kpiList.className = 'kpis-list'; // 編集用クラスを追加
    if (Array.isArray(okrKpi.kpis)) {
        okrKpi.kpis.forEach(kpi => {
            const kpiItem = document.createElement('li');
            kpiItem.textContent = kpi;
            kpiList.appendChild(kpiItem);
        });
    } else {
        const kpiItem = document.createElement('li');
        kpiItem.textContent = 'まだ設定されていません';
        kpiList.appendChild(kpiItem);
    }
    container.appendChild(kpiList);
    
    return container;
}

// ...
// タスクリストを作成
function createTasksContent(tasks) {
    const container = document.createElement('div');
    container.className = 'task-list';
    
    tasks.forEach(task => {
        const taskItem = document.createElement('div');
        // 重要タスクにはクラスを追加
        taskItem.className = task.important ? 'task-item important' : 'task-item';
        taskItem.dataset.id = task.id;
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'task-checkbox';
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', function() {
            toggleTaskStatus(task.id);
        });
        
        const taskText = document.createElement('span');
        taskText.className = 'task-text';
        taskText.textContent = task.text;
        
        taskItem.appendChild(checkbox);
        taskItem.appendChild(taskText);
        container.appendChild(taskItem);
    });
    
    return container;
}

// ブランドタスク一覧を表示
function renderBrandTasksUI(filter = 'all') {
    try {
        console.log('ブランドタスク一覧の表示を開始します。フィルター:', filter, 'ブランド数:', brandsData.length);
        const container = document.querySelector('.brand-tasks-container');
        if (!container) {
            console.error('タスク一覧コンテナが見つかりませんでした');
            return;
        }
        
        container.innerHTML = '';
        
        // データがなければサンプルデータを使用
        if (!brandsData || brandsData.length === 0) {
            console.log('ブランドデータがないため、サンプルデータを使用します');
            brandsData = createSampleData();
            saveDataToLocalStorage();
        }
        
        // ブランドごとのタスクをフィルタリングして表示
        brandsData.forEach(brand => {
            console.log(`ブランド '${brand.name}' のタスクを処理中...`);
            const brandTasks = brand.tasks || [];
            // フィルタリング
            let filteredTasks = brandTasks;
            if (filter === 'important') {
                filteredTasks = brandTasks.filter(task => task.important);
            } else if (filter === 'incomplete') {
                filteredTasks = brandTasks.filter(task => !task.completed);
            } else if (filter === 'completed') {
                filteredTasks = brandTasks.filter(task => task.completed);
            }
            
            // タスクがない場合もブランドは表示する
            const brandTaskGroup = document.createElement('div');
            brandTaskGroup.className = 'brand-task-group';
            
            // ブランド名
            const brandTitle = document.createElement('h3');
            brandTitle.className = 'brand-task-title';
            brandTitle.textContent = brand.name;
            brandTaskGroup.appendChild(brandTitle);
            
            // タスク入力フィールド
            const taskInput = document.createElement('div');
            taskInput.className = 'task-input';
            taskInput.innerHTML = `
                <input type="text" class="new-task-input" placeholder="新しいタスク..." data-brand-id="${brand.id}">
            `;
            brandTaskGroup.appendChild(taskInput);
            
            // タスクリスト
            const taskList = document.createElement('ul');
            taskList.className = 'task-list';
            
            // タスク項目を作成
            filteredTasks.forEach(task => {
                const taskItem = document.createElement('li');
                taskItem.className = 'task-item';
                if (task.completed) {
                    taskItem.classList.add('completed');
                }
                if (task.important) {
                    taskItem.classList.add('important');
                }
                
                taskItem.innerHTML = `
                    <div class="task-checkbox">
                        <input type="checkbox" id="task-${task.id}" ${task.completed ? 'checked' : ''}>
                        <label for="task-${task.id}"></label>
                    </div>
                    <div class="task-content">${task.text}</div>
                    <div class="task-actions">
                        <button class="important-btn ${task.important ? 'active' : ''}">
                            <i class="fas fa-star"></i>
                        </button>
                        <button class="delete-task-btn">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                `;
                
                taskList.appendChild(taskItem);
                
                // チェックボックスのイベントリスナー
                const checkbox = taskItem.querySelector(`#task-${task.id}`);
                checkbox.addEventListener('change', function() {
                    toggleTaskStatus(task.id);
                });
                
                // 重要ボタンのイベントリスナー
                const importantBtn = taskItem.querySelector('.important-btn');
                importantBtn.addEventListener('click', function() {
                    toggleTaskImportance(task.id);
                    this.classList.toggle('active');
                });
                
                // 削除ボタンのイベントリスナー
                const deleteBtn = taskItem.querySelector('.delete-task-btn');
                deleteBtn.addEventListener('click', function() {
                    deleteTask(task.id, brand.id);
                    taskItem.remove();
                });
            });
            
            brandTaskGroup.appendChild(taskList);
            container.appendChild(brandTaskGroup);
            
            // 新規タスク入力のイベントリスナー
            const newTaskInput = taskInput.querySelector('.new-task-input');
            newTaskInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter' && this.value.trim() !== '') {
                    const brandId = this.dataset.brandId;
                    addTaskToBrand(brandId, this.value.trim());
                    this.value = '';
                    renderBrandTasksUI(filter);
                }
            });
        });
        console.log('ブランドタスク一覧の表示を完了しました');
    } catch (error) {
        console.error('タスク一覧表示時にエラーが発生しました:', error);
        // エラー時にサンプルデータを使用
        brandsData = createSampleData();
        saveDataToLocalStorage();
        // エラー後に再度表示を試みる
        setTimeout(() => {
            console.log('エラー後に再表示を試みます');
            renderBrandTasksUI(filter);
        }, 500);
    }
}

// データをローカルストレージに保存
async function saveDataToLocalStorage() {
    // ローカルストレージに保存
    localStorage.setItem('brandsData', JSON.stringify(brandsData));
    
    // ローカルストレージモードが無効ならSupabaseにも保存
    if (!isLocalStorageMode()) {
        try {
            // ユーザーがログインしているか確認
            const user = await getCurrentUser();
            if (user) {
                console.log('Supabaseにデータを保存します');
                // 各ブランドを個別に保存する方法を使用
                for (const brand of brandsData) {
                    try {
                        const result = await saveBrandToSupabase(brand);
                        if (result.error) {
                            console.error(`ブランド(${brand.id || brand.name})の保存中にエラー:`, result.error);
                        }
                    } catch (brandError) {
                        console.error(`ブランド保存中の例外:`, brandError);
                    }
                }
                console.log('すべてのブランドデータをSupabaseに保存しました');
            } else {
                console.log('ログインしていないため、Supabaseへの保存をスキップします');
            }
        } catch (error) {
            console.error('Supabaseへの保存中にエラーが発生しました:', error);
        }
    }
    
    console.log('データを保存しました');
}

// すべてのブランドデータをSupabaseに保存する関数
async function saveAllDataToSupabase() {
    try {
        // ユーザーがログインしているか確認
        const user = await getCurrentUser();
        if (!user) {
            console.warn('ログインしていないのでSupabaseに保存できません');
            return { error: new Error('ログインしていないのでSupabaseに保存できません') };
        }
        

// Supabase認証機能
// ユーザーのログイン状態を確認する関数
async function checkUserSession() {
    try {
        if (!supabase) {
            console.error('Supabaseクライアントが初期化されていません');
            return false;
        }
        
        const user = await getCurrentUser();
        return !!user; // userが存在すればtrue、それ以外は全てfalse
    } catch (error) {
        console.error('ユーザーセッションの確認中にエラーが発生しました:', error);
        return false;
    }
}

// Supabaseからデータを読み込む関数
async function loadDataFromSupabase() {
    try {
        // Supabaseクライアントが初期化されているか確認
        if (!supabase) {
            console.error('Supabaseクライアントが初期化されていません');
            return false;
        }
        
        // ユーザーがログインしているか確認
        const user = await getCurrentUser();
        if (!user) {
            console.warn('ログインしていないため、Supabaseからのデータ読み込みをスキップします');
            return false;
        }
        
        // brandsテーブルからデータを取得
        const { data, error } = await supabase
            .from('brands')
            .select('*')
            .order('id');
        
        if (error) {
            console.error('Supabaseからのデータ取得中にエラーが発生しました:', error);
            return false;
        }
        
        if (data && data.length > 0) {
            // 取得したデータで既存の配列を更新
            brandsData = data;
            console.log(`Supabaseから${data.length}件のブランドデータを読み込みました`);
            return true;
        } else {
            console.log('Supabaseにデータがありません');
            return false;
        }
    } catch (error) {
        console.error('データ読み込み中にエラーが発生しました:', error);
        return false;
    }
}

// ブランドをSupabaseに保存する関数
async function saveBrandToSupabase(brand) {
    try {
        // Supabaseクライアントが初期化されているか確認
        if (!supabase) {
            console.error('Supabaseクライアントが初期化されていません');
            return { error: new Error('Supabaseクライアントが初期化されていません') };
        }
        
        // ユーザー認証チェック
        const user = await getCurrentUser();
        if (!user) {
            console.warn('ログインしていないのでSupabaseに保存できません');
            return { error: new Error('ログインしていないのでSupabaseに保存できません') };
        }
        
        // 既存のブランドか新規ブランドかを確認
        const { data: existingBrand, error: checkError } = await supabase
            .from('brands')
            .select('id')
            .eq('id', brand.id)
            .maybeSingle();
        
        let result;
        
        if (checkError) {
            console.error('ブランド確認中にエラーが発生しました:', checkError);
            return { error: checkError };
        }
        
        if (existingBrand) {
            // 既存のブランドを更新
            result = await supabase
                .from('brands')
                .update(brand)
                .eq('id', brand.id)
                .select();
        } else {
            // 新規ブランドを作成
            result = await supabase
                .from('brands')
                .insert([brand])
                .select();
        }
        
        if (result.error) {
            console.error('ブランド保存中にエラーが発生しました:', result.error);
            return { error: result.error };
        }
        
        console.log('ブランドをSupabaseに保存しました:', brand.id);
        return { data: result.data, success: true };
    } catch (error) {
        console.error('ブランド保存中に例外が発生しました:', error);
        return { error };
    }
}

// ... (省略)

// すべてのブランドデータをSupabaseに保存する関数
async function saveAllDataToSupabase() {
    try {
        // ユーザーがログインしているか確認
        const user = await getCurrentUser();
        if (!user) {
            console.warn('ログインしていないのでSupabaseに保存できません');
            return { error: new Error('ログインしていないのでSupabaseに保存できません') };
        }
        
        // 各ブランドを個別に保存
        for (const brand of brandsData) {
            const { error } = await saveBrandToSupabase(brand);
            if (error) {
                console.error(`ブランド(${brand.id})の保存中にエラーが発生しました:`, error.message);
            }
        }
        
        console.log('すべてのブランドデータをSupabaseに保存しました');
        return { success: true };
    } catch (error) {
        console.error('Supabaseへのデータ保存中にエラーが発生しました:', error);
        return { error };
    }
}

// ... (省略)

// ログイン処理
async function handleLogin() {
    const emailInput = document.getElementById('email-input');
    const passwordInput = document.getElementById('password-input');
    const loginError = document.getElementById('login-error');
    
    loginError.textContent = '';
    
    try {
        const { data, error } = await signIn(emailInput.value, passwordInput.value);
        
        if (error) {
            loginError.textContent = 'メールアドレスまたはパスワードが正しくありません';
            passwordInput.value = '';
            return;
        }
        
        // ログイン成功
        document.getElementById('login-overlay').style.display = 'none';
        
        // Supabaseからデータを読み込みます
        const dataLoaded = await loadDataFromSupabase();
        
        // データがない場合はサンプルデータを使用
        if (!dataLoaded || brandsData.length === 0) {
            console.log('データが読み込めなかったため、サンプルデータを使用します');
            brandsData = createSampleData();
            await saveDataToLocalStorage();
        }
        
        try {
            // タスク一覧表を表示
            renderTasksTable();
            
            // ブランドデータを表示
            renderBrands();
            
            // クリックイベントの設定
            setupEventListeners();
            
            // ブランドタスク一覧を表示
            renderBrandTasksUI();
            
            // タスク一覧用イベントリスナー
            setupTasksTableListeners();
            
            // ブランド編集機能を有効化
            initEditButtons();
        } catch (error) {
            console.error('初期化時にエラーが発生しました:', error);
        }
    } catch (err) {
        console.error('ログイン中にエラーが発生しました:', err);
        loginError.textContent = 'ログインに失敗しました。もう一度お試しください。';
        passwordInput.value = '';
    }
}

// サインアップ処理
async function handleSignUp() {
    const emailInput = document.getElementById('email-input');
    const passwordInput = document.getElementById('password-input');
    const loginError = document.getElementById('login-error');
    
    if (!emailInput.value || !passwordInput.value) {
        loginError.textContent = 'メールアドレスとパスワードを入力してください';
        return;
    }
    
    if (passwordInput.value.length < 6) {
        loginError.textContent = 'パスワードは6文字以上で設定してください';
        return;
    }
    
    try {
        const { data, error } = await signUp(emailInput.value, passwordInput.value);
        
        if (error) {
            loginError.textContent = `アカウント作成に失敗しました: ${error.message}`;
            return;
        }
        
        loginError.textContent = 'アカウントを作成しました。確認メールをご確認ください。';
    } catch (err) {
        console.error('サインアップ中にエラーが発生しました:', err);
        loginError.textContent = 'アカウント作成に失敗しました。もう一度お試しください。';
    }
}

// ログアウト処理
async function handleLogout() {
    try {
        const { error } = await signOut();
        if (error) {
            console.error('ログアウト中にエラーが発生しました:', error);
        }
        window.location.reload(); // ページを再読み込み
    } catch (err) {
        console.error('ログアウト中に問題が発生しました:', err);
    }
}

// デモデータの作成
function createSampleData() {
    console.log('サンプルデータを生成します（AI食堂を含む）');
    // サンプルブランドデータを作成
    return [
        {
            id: 1,
            name: 'ノアノア',
            type: 'ファッション',
            awareness: 65,
            preference: 72,
            equity: {
                why: '自然素材を使ったサステナブルなファッションを提供する',
                who: '20-40代の環境意識の高い女性',
                what: '自然素材のファッションアイテム',
                how: 'サステナブルな生産方法とデザイン性の両立'
            },
            strategy: {
                situation: 'サステナブルファッション市場が拡大中',
                advantage: '自然素材の調達ネットワークとデザイン力',
                differentiation: '品質とデザインを妑くわせたサステナブル商品'
            },
            okr_kpi: {
                objectives: ['新規顾客募集', '認知度向上'],
                key_results: ['月間販売個攠30%増', 'SNSフォロワー2倍化'],
                kpis: ['ウェブサイトCV率', 'リピート率']
            },
            tasks: [
                { id: 1, text: '秋全新コレクションの準備', completed: false, important: true },
                { id: 2, text: 'SNSキャンペーンプランの作成', completed: true, important: false },
                { id: 3, text: 'インフルエンサーとのコラボ企画', completed: false, important: true }
            ]
        },
        {
            id: 2,
            name: 'ココナラ',
            type: 'スキルマッチング',
            awareness: 82,
            preference: 78,
            equity: {
                why: '一人ひとりのスキルを活かした副業や収入向上を支援する',
                who: '副業やスキルを活かしたい全年齢層',
                what: 'スキルマッチングサービス',
                how: '簡単な出品と安心の取引システム'
            },
            strategy: {
                situation: '副業市場の拡大とデジタルスキルの需要増',
                advantage: '広範なスキルジャンルと利用者数',
                differentiation: 'カテゴリの幅広さと使いやすいインターフェース'
            },
            okr_kpi: {
                objectives: ['新規カテゴリ開拓', '企業契約数拡大'],
                key_results: ['月間取引額20%増', '新規採用企業開拓30社'],
                kpis: ['リピート購入率', 'アプリダウンロード数']
            },
            tasks: [
                { id: 4, text: 'アプリ新機能リリース', completed: false, important: true },
                { id: 5, text: '新規カテゴリ追加の企画', completed: false, important: true },
                { id: 6, text: '出品者向けセミナーの開催', completed: true, important: false }
            ]
        },
        {
            id: 3,
            name: 'AIヒーローズジム',
            type: 'フィットネス',
            awareness: 45,
            preference: 68,
            equity: {
                why: 'AIを活用したパーソナルトレーニングで効率的なフィットネスを提供',
                who: '忙しい社会人やフィットネス初心者',
                what: 'AIパーソナルトレーニングジム',
                how: '最新テクノロジーとプロの知見を融合したサービス'
            },
            strategy: {
                situation: '健康意識の高まりとAI技術の一般化',
                advantage: 'AIトレーニングアルゴリズムと専門トレーナーの知見',
                differentiation: '完全カスタマイズされたトレーニングプラン'
            },
            okr_kpi: {
                objectives: ['新規店舗展開', '会員継続率向上'],
                key_results: ['月間新規会員25%増', '平均利用期間をとし3ヶ月以上に'],
                kpis: ['本人紹介率', '会員満足度スコア']
            },
            tasks: [
                { id: 7, text: 'AIトレーニングアルゴリズムの改善', completed: false, important: true },
                { id: 8, text: '新店舗出店候補地の調査', completed: true, important: false },
                { id: 9, text: '外部トレーナーのリクルート', completed: false, important: true }
            ]
        },
        {
            id: 4,
            name: 'スタキャリ',
            type: '人材紹介',
            awareness: 58,
            preference: 62,
            equity: {
                why: '学生のキャリア形成を早期から支援し、適切な企業とマッチング',
                who: '大学生・大学院生、新卒采用を行う企業',
                what: '学生特化型キャリア・就職支援サービス',
                how: '性格や価値観を重視したマッチング技術'
            },
            strategy: {
                situation: '新卒採用市場の競争激化とミスマッチ問題',
                advantage: '独自の適性診断ツールと企業ネットワーク',
                differentiation: '価値観マッチングと早期からのキャリア支援'
            },
            okr_kpi: {
                objectives: ['登録学生数増加', '企業契約数拡大'],
                key_results: ['学生登録数前年比倍増', '新規採用企業開拓30社'],
                kpis: ['内定率', '企業満足度スコア']
            },
            tasks: [
                { id: 10, text: '適性診断アルゴリズムの改善', completed: false, important: true },
                { id: 11, text: '学生向けセミナーの開催', completed: true, important: false },
                { id: 12, text: '新規採用企業の開拓', completed: false, important: true }
            ]
        }
    ];
}

// ログインボタンのイベントリスナー設定
function setupLoginListeners() {
    const loginButton = document.getElementById('login-button');
    const signupButton = document.getElementById('signup-button');
    const skipLoginButton = document.getElementById('skip-login-button');
    const emailInput = document.getElementById('email-input');
    const passwordInput = document.getElementById('password-input');
    
    // ログインボタンクリック
    loginButton.addEventListener('click', handleLogin);
    
    // サインアップボタンクリック
    signupButton.addEventListener('click', handleSignUp);
    
    // ログインスキップボタンクリック
    skipLoginButton.addEventListener('click', function() {
        // ローカルストレージモードを有効化
        setLocalStorageMode(true);
        
        // ログインオーバーレイを非表示
        document.getElementById('login-overlay').style.display = 'none';
        
        // ローカルストレージからデータを読み込む
        loadDataFromLocalStorage();
        
        // データがない場合はサンプルデータを作成
        if (brandsData.length === 0) {
            brandsData = createSampleData();
            saveDataToLocalStorage(); // サンプルデータを保存
        }
        
        try {
            // タスク一覧表を表示
            renderTasksTable();
            
            // ブランドデータを表示
            renderBrands();
            
            // クリックイベントの設定
            setupEventListeners();
            
            // ブランドタスク一覧を表示
            renderBrandTasksUI();
            
            // タスク一覧用イベントリスナー
            setupTasksTableListeners();
            
            // ブランド編集機能を有効化
            initEditButtons();
        } catch (error) {
            console.error('初期化時にエラーが発生しました:', error);
        }
    });
    
    // Enterキープレスでログイン
    passwordInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleLogin();
        }
    });
    
    // ヘッダーにログアウトボタンを追加
    const header = document.querySelector('header');
    const logoutBtn = document.createElement('button');
    logoutBtn.textContent = 'ログアウト';
    logoutBtn.classList.add('logout-button');
    logoutBtn.addEventListener('click', handleLogout);
    header.appendChild(logoutBtn);
}

// ページ読み込み時に実行
document.addEventListener('DOMContentLoaded', async function() {
    // ログインリスナーを設定
    setupLoginListeners();
    console.log('アプリケーション初期化を開始します');

    try {
        // まずローカルストレージからデータ読み込みを試みる（初期データとして）
        const localDataLoaded = loadDataFromLocalStorage();
        console.log('ローカルストレージからのデータ読み込み結果:', localDataLoaded, '件数:', brandsData.length);
        
        // ローカルストレージモードか確認
        if (isLocalStorageMode()) {
            console.log('ローカルストレージモードでの実行を開始');
            
            // データがない場合はサンプルデータを生成
            if (brandsData.length === 0) {
                console.log('データがないため、サンプルデータを生成します');
                brandsData = createSampleData();
                saveDataToLocalStorage();
                console.log('サンプルデータを生成・保存しました:', brandsData.length, '件');
            }
            
            // ログインオーバーレイを非表示
            document.getElementById('login-overlay').style.display = 'none';
            
            // UI初期化
            initializeUI();
            console.log('ローカルモードでUIを初期化しました');
            return;
        }

        // Supabaseモードの場合の処理
        console.log('Supabaseモードでの処理を開始します');
        
        // ログイン状態を確認
        const isLoggedIn = await checkUserSession();
        console.log('ログイン状態:', isLoggedIn ? 'ログイン済み' : '未ログイン');

        if (isLoggedIn) {
            // Supabaseからデータを読み込む
            const dataLoaded = await loadDataFromSupabase();
            console.log('Supabaseからのデータ読み込み結果:', dataLoaded, '件数:', brandsData.length);
            
            // データがない場合はサンプルデータを使用
            if (!dataLoaded || brandsData.length === 0) {
                console.log('有効なデータがないため、サンプルデータを使用します');
                brandsData = createSampleData();
                console.log('サンプルデータを生成しました:', brandsData.length, '件');
                saveDataToLocalStorage();
                // 各ブランドを個別に保存
                for (const brand of brandsData) {
                    await saveBrandToSupabase(brand);
                }
            }
        } else {
            // 未ログインの場合、ローカルデータを使用する
            if (brandsData.length === 0) {
                console.log('未ログイン状態: サンプルデータを使用します');
                brandsData = createSampleData();
                saveDataToLocalStorage();
            }
        }
        
        // どちらの場合もUI初期化
        initializeUI();
        console.log('UIを初期化しました。ブランド数:', brandsData.length);
        
    } catch (error) {
        console.error('初期化中にエラーが発生しました:', error);
        // エラー時は確実にサンプルデータを使用
        console.log('エラー発生: フォールバック処理を実行します');
        brandsData = createSampleData();
        saveDataToLocalStorage();
        console.log('サンプルデータを設定しました:', brandsData.length, '件');
        initializeUI();
    }
});

// タスク一覧表示関数
function renderTasksTable(filter = 'all') {
    // この関数はタスク一覧のレンダリングを行います
    // 実際の表示は renderBrandTasksUI に委託します
    try {
        // フィルターボタンのアクティブ状態を更新
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => {
            if (btn.dataset.filter === filter) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        
        // ブランドタスク一覧を表示
        renderBrandTasksUI(filter);
    } catch (error) {
        console.error('タスク一覧表示時にエラーが発生しました:', error);
    }
}

// 編集ボタンの初期化
function initEditButtons() {
    try {
        // すべての編集ボタンにイベントリスナーを設定
        document.querySelectorAll('.edit-button').forEach(button => {
            button.addEventListener('click', function() {
                // ブランドカードを取得
                const brandCard = this.closest('.brand-card');
                if (!brandCard) {
                    console.error('編集ボタンの親要素としてブランドカードが見つかりません');
                    return;
                }
                
                // 編集モードの切り替え
                brandCard.classList.toggle('editing');
                
                if (brandCard.classList.contains('editing')) {
                    this.textContent = 'キャンセル';
                    createEditForm(brandCard);
                } else {
                    this.textContent = '編集';
                    brandCard.querySelector('.edit-form')?.remove();
                }
            });
        });
        console.log('編集ボタンの初期化が完了しました');
    } catch (error) {
        console.error('編集ボタンの初期化中にエラーが発生しました:', error);
    }
}

// 各種イベントリスナーの設定
function setupEventListeners() {
    // ブランドの編集ボタンクリック時の処理
    document.querySelectorAll('.edit-button').forEach(button => {
        button.addEventListener('click', function() {
            // ブランドカードを取得
            const brandCard = this.closest('.brand-card');
            if (!brandCard) {
                console.error('編集ボタンの親要素としてブランドカードが見つかりません');
                return;
            }
            
            // 編集モードの切り替え
            brandCard.classList.toggle('editing');
            
            if (brandCard.classList.contains('editing')) {
                this.textContent = 'キャンセル';
                createEditForm(brandCard);
            } else {
                this.textContent = '編集';
                brandCard.querySelector('.edit-form')?.remove();
            }
        });
    });
    
    // 新規タスク追加ボタンのイベントリスナー
    document.getElementById('add-task-btn')?.addEventListener('click', function() {
        openTaskModal();
    });
}

// ブランド編集フォームの作成
function createEditForm(section) {
    try {
        console.log('編集フォームを作成しています:', section.id);
        
        // ブランドIDを取得
        const brandId = section.id;
        
        // 編集対象のブランドを取得
        const brand = brandsData.find(b => b.id === brandId);
        if (!brand) {
            console.error('編集対象のブランドが見つかりません:', brandId);
            return;
        }
        
        // 既にフォームがあれば削除
        const existingForm = section.querySelector('.edit-form');
        if (existingForm) {
            existingForm.remove();
        }
        
        // 編集フォームの作成
        const editForm = document.createElement('div');
        editForm.className = 'edit-form';
        
        // フォームの内容を作成
        editForm.innerHTML = `
            <form id="edit-form-${brandId}" onsubmit="return false;">
                <div class="form-group">
                    <label for="name-${brandId}">ブランド名</label>
                    <input type="text" id="name-${brandId}" name="name" value="${brand.name || ''}" required>
                </div>
                <div class="form-group">
                    <label for="type-${brandId}">タイプ</label>
                    <input type="text" id="type-${brandId}" name="type" value="${brand.type || ''}">
                </div>
                
                <!-- ブランドエクイティセクション -->
                <h4>ブランドエクイティ</h4>
                <div class="form-group">
                    <label for="why-${brandId}">Why（なぜ）</label>
                    <textarea id="why-${brandId}" name="why">${brand.equity?.why || ''}</textarea>
                </div>
                <div class="form-group">
                    <label for="who-${brandId}">Who（誰に）</label>
                    <textarea id="who-${brandId}" name="who">${brand.equity?.who || ''}</textarea>
                </div>
                <div class="form-group">
                    <label for="what-${brandId}">What（何を）</label>
                    <textarea id="what-${brandId}" name="what">${brand.equity?.what || ''}</textarea>
                </div>
                <div class="form-group">
                    <label for="how-${brandId}">How（どのように）</label>
                    <textarea id="how-${brandId}" name="how">${brand.equity?.how || ''}</textarea>
                </div>
                
                <!-- 認知度・選好度 -->
                <h4>認知度・選好度</h4>
                <div class="form-group">
                    <label for="awareness-${brandId}">認知度</label>
                    <input type="number" id="awareness-${brandId}" name="awareness" min="0" max="100" value="${brand.awareness || 0}">
                </div>
                <div class="form-group">
                    <label for="preference-${brandId}">選好度</label>
                    <input type="number" id="preference-${brandId}" name="preference" min="0" max="100" value="${brand.preference || 0}">
                </div>
                
                <!-- マーケティング戦略 -->
                <h4>マーケティング戦略</h4>
                <div class="form-group">
                    <label for="concept-${brandId}">コンセプト</label>
                    <textarea id="concept-${brandId}" name="concept">${brand.strategy?.concept || ''}</textarea>
                </div>
                <div class="form-group">
                    <label for="positioning-${brandId}">ポジショニング</label>
                    <textarea id="positioning-${brandId}" name="positioning">${brand.strategy?.positioning || ''}</textarea>
                </div>
                <div class="form-group">
                    <label for="uniqueValue-${brandId}">独自価値</label>
                    <textarea id="uniqueValue-${brandId}" name="uniqueValue">${brand.strategy?.uniqueValue || ''}</textarea>
                </div>
                <div class="form-group">
                    <label for="targetAudience-${brandId}">対象顧客</label>
                    <textarea id="targetAudience-${brandId}" name="targetAudience">${brand.strategy?.targetAudience || ''}</textarea>
                </div>
                
                <!-- OKR/KPI -->
                <h4>OKR・KPI</h4>
                <div class="form-group">
                    <label for="objective-${brandId}">目標</label>
                    <textarea id="objective-${brandId}" name="objective">${brand.okrKpi?.objective || ''}</textarea>
                </div>
                <div class="form-group">
                    <label for="keyResults-${brandId}">主要結果</label>
                    <textarea id="keyResults-${brandId}" name="keyResults">${brand.okrKpi?.keyResults?.join('\n') || ''}</textarea>
                    <small>※ 改行で区切って入力してください</small>
                </div>
                <div class="form-group">
                    <label for="kpis-${brandId}">KPI</label>
                    <textarea id="kpis-${brandId}" name="kpis">${brand.okrKpi?.kpis?.join('\n') || ''}</textarea>
                    <small>※ 改行で区切って入力してください</small>
                </div>
                
                <div class="form-group">
                    <button type="button" id="save-brand-${brandId}" class="save-btn" data-brand-id="${brandId}">保存</button>
                </div>
            </form>
        `;
        
        // セクションにフォームを追加
        section.appendChild(editForm);
        
        // 保存ボタンを取得
        const saveBtn = document.getElementById(`save-brand-${brandId}`);
        if (saveBtn) {
            // 既存のイベントリスナーをクリア
            const newBtn = saveBtn.cloneNode(true);
            saveBtn.parentNode.replaceChild(newBtn, saveBtn);
            
            // 新しいイベントリスナーを設定
            newBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('保存ボタンがクリックされました:', brandId);
                saveBrandEdits(brandId);
            });
            
            console.log('保存ボタンのイベントリスナーを設定しました');
        } else {
            console.error('保存ボタンが見つかりません');
        }
        
        console.log('編集フォームが正常に作成されました:', brandId);
    } catch (error) {
        console.error('編集フォームの作成中にエラーが発生しました:', error);
        alert('編集フォームの作成中にエラーが発生しました\n' + error.message);
    }
}

// ブランド編集内容の保存
async function saveBrandEdits(brandId) {
    try {
        console.log('ブランド編集内容を保存しています:', brandId);
        
        // 対象ブランドのインデックスを取得
        const brandIndex = brandsData.findIndex(b => b.id === brandId);
        if (brandIndex === -1) {
            console.error('対象ブランドが見つかりません:', brandId);
            return false;
        }
        
        // フォームの入力値を取得 - 基本情報
        const nameInput = document.getElementById(`name-${brandId}`);
        const typeInput = document.getElementById(`type-${brandId}`);
        const awarenessInput = document.getElementById(`awareness-${brandId}`);
        const preferenceInput = document.getElementById(`preference-${brandId}`);
        
        // エクイティ情報
        const whyInput = document.getElementById(`why-${brandId}`);
        const whoInput = document.getElementById(`who-${brandId}`);
        const whatInput = document.getElementById(`what-${brandId}`);
        const howInput = document.getElementById(`how-${brandId}`);
        
        // 戦略情報
        const conceptInput = document.getElementById(`concept-${brandId}`);
        const positioningInput = document.getElementById(`positioning-${brandId}`);
        const uniqueValueInput = document.getElementById(`uniqueValue-${brandId}`);
        const targetAudienceInput = document.getElementById(`targetAudience-${brandId}`);
        
        // OKR/KPI情報
        const objectiveInput = document.getElementById(`objective-${brandId}`);
        const keyResultsInput = document.getElementById(`keyResults-${brandId}`);
        const kpisInput = document.getElementById(`kpis-${brandId}`);
        
        if (!nameInput || !typeInput) {
            console.error('必須フォーム要素が見つかりません');
            return false;
        }
        
        try {
            // 更新対象のブランドを取得
            const currentBrand = brandsData[brandIndex];
            
            // ブランドデータを更新
            const updatedBrand = {
                ...currentBrand,
                name: nameInput.value,
                type: typeInput.value,
                awareness: Number(awarenessInput?.value || 0),
                preference: Number(preferenceInput?.value || 0),
                
                // エクイティ情報を更新
                equity: {
                    why: whyInput?.value || '',
                    who: whoInput?.value || '',
                    what: whatInput?.value || '',
                    how: howInput?.value || ''
                },
                
                // 戦略情報を更新
                strategy: {
                    concept: conceptInput?.value || '',
                    positioning: positioningInput?.value || '',
                    uniqueValue: uniqueValueInput?.value || '',
                    targetAudience: targetAudienceInput?.value || ''
                },
                
                // OKR/KPI情報を更新
                okrKpi: {
                    objective: objectiveInput?.value || '',
                    keyResults: keyResultsInput?.value ? keyResultsInput.value.split('\n').filter(item => item.trim()) : [],
                    kpis: kpisInput?.value ? kpisInput.value.split('\n').filter(item => item.trim()) : []
                }
            };
            
            // データを更新
            brandsData[brandIndex] = updatedBrand;
            
            console.log('ブランドデータを更新しました:', updatedBrand.id, updatedBrand.name);
            
            // まずSupabaseに保存を試みる
            if (!isLocalStorageMode()) {
                try {
                    const saveResult = await saveBrandToSupabase(updatedBrand);
                    if (saveResult.error) {
                        console.error('Supabaseにブランドデータを保存中にエラーが発生しました:', saveResult.error);
                        // Supabaseの保存が失敗した場合、少なくともローカルには保存する
                        localStorage.setItem('brandsData', JSON.stringify(brandsData));
                    } else {
                        console.log('Supabaseにブランドデータを正常に保存しました:', updatedBrand.id);
                        // ローカルストレージにも保存して同期を維持
                        localStorage.setItem('brandsData', JSON.stringify(brandsData));
                    }
                } catch (saveError) {
                    console.error('Supabase保存中に例外が発生しました:', saveError);
                    // エラー発生時はローカルストレージには保存
                    localStorage.setItem('brandsData', JSON.stringify(brandsData));
                }
            } else {
                // ローカルストレージモードの場合はローカルのみに保存
                localStorage.setItem('brandsData', JSON.stringify(brandsData));
                console.log('ローカルストレージにデータを保存しました');
            }
            
            // 編集モードを終了
            const section = document.getElementById(brandId);
            if (section) {
                section.classList.remove('editing');
                const editButton = section.querySelector('.edit-button');
                if (editButton) {
                    editButton.textContent = '編集';
                }
                const editForm = section.querySelector('.edit-form');
                if (editForm) {
                    editForm.remove();
                }
                
                // 直接UI要素を更新
                const brandNameElem = section.querySelector('.brand-name');
                const brandTypeElem = section.querySelector('.brand-type');
                if (brandNameElem) brandNameElem.textContent = updatedBrand.name;
                if (brandTypeElem) brandTypeElem.textContent = updatedBrand.type;
                
                // アウェアネスと選好度のプログレスバーを更新
                const awarenessBar = section.querySelector('.awareness-progress');
                const preferenceBar = section.querySelector('.preference-progress');
                if (awarenessBar) awarenessBar.style.width = `${updatedBrand.awareness}%`;
                if (preferenceBar) preferenceBar.style.width = `${updatedBrand.preference}%`;
                
                // エクイティ情報を更新
                const whyElem = section.querySelector('.equity-why');
                const whoElem = section.querySelector('.equity-who');
                const whatElem = section.querySelector('.equity-what');
                const howElem = section.querySelector('.equity-how');
                
                if (whyElem) whyElem.textContent = updatedBrand.equity.why;
                if (whoElem) whoElem.textContent = updatedBrand.equity.who;
                if (whatElem) whatElem.textContent = updatedBrand.equity.what;
                if (howElem) howElem.textContent = updatedBrand.equity.how;
                
                // 戦略情報を更新
                const conceptElem = section.querySelector('.strategy-concept');
                const positioningElem = section.querySelector('.strategy-positioning');
                const uniqueValueElem = section.querySelector('.strategy-uniqueValue');
                const targetAudienceElem = section.querySelector('.strategy-targetAudience');
                
                if (conceptElem) conceptElem.textContent = updatedBrand.strategy.concept;
                if (positioningElem) positioningElem.textContent = updatedBrand.strategy.positioning;
                if (uniqueValueElem) uniqueValueElem.textContent = updatedBrand.strategy.uniqueValue;
                if (targetAudienceElem) targetAudienceElem.textContent = updatedBrand.strategy.targetAudience;
                
                // OKR/KPI情報を更新
                const objectiveElem = section.querySelector('.okrKpi-objective');
                if (objectiveElem) objectiveElem.textContent = updatedBrand.okrKpi.objective;
                
                // Key Results 更新
                const keyResultsList = section.querySelector('.key-results-list');
                if (keyResultsList) {
                    keyResultsList.innerHTML = updatedBrand.okrKpi.keyResults.map(kr => `<li>${kr}</li>`).join('');
                }
                
                // KPIs 更新
                const kpisList = section.querySelector('.kpis-list');
                if (kpisList) {
                    kpisList.innerHTML = updatedBrand.okrKpi.kpis.map(kpi => `<li>${kpi}</li>`).join('');
                }
            }
            
            // ブランドセクションを再レンダリング
            renderBrands();
            
            // 保存通知
            showSaveNotification('ブランド情報を保存しました');
            console.log('ブランド編集を保存しました:', brandId);
            return true;
        } catch (dataError) {
            console.error('データ更新中にエラーが発生しました:', dataError);
            return false;
        }
    } catch (error) {
        console.error('ブランド編集の保存中にエラーが発生しました:', error);
        alert('保存中にエラーが発生しました\n' + error.message);
        return false;
    }
}

// ブランド編集ボタンのイベントリスナーを初期化
function initEditButtons() {
    console.log('ブランド編集ボタンのイベントリスナーを設定中');
    
    // 編集ボタンを取得
    document.querySelectorAll('.edit-button').forEach(button => {
        // 既存のイベントリスナーを削除
        const newButton = button.cloneNode(true);
        button.parentNode.replaceChild(newButton, button);
        
        // 新しいイベントリスナーを追加
        newButton.addEventListener('click', function() {
            try {
                // ブランドカードを取得
                const brandCard = this.closest('.brand-card');
                if (!brandCard) {
                    console.error('編集ボタンの親要素としてブランドカードが見つかりません');
                    return;
                }
                
                const brandId = brandCard.id;
                console.log('編集ボタンがクリックされました:', brandId);
                
                // 編集対象のブランドを取得
                const brand = brandsData.find(b => b.id === brandId);
                if (!brand) {
                    console.error('編集対象のブランドが見つかりません:', brandId);
                    return;
                }
                
                // 編集モードの切り替え
                try {
                    if (brandCard.classList.contains('editing')) {
                        // 編集モードを終了
                        brandCard.classList.remove('editing');
                        this.textContent = '編集';
                        
                        // 編集フォームがあれば削除
                        const editForm = brandCard.querySelector('.edit-form');
                        if (editForm) {
                            editForm.remove();
                        }
                    } else {
                        // 編集モードを開始
                        brandCard.classList.add('editing');
                        this.textContent = 'キャンセル';
                        createEditForm(brandCard);
                    }
                } catch (classError) {
                    console.error('編集モードの切り替え中にエラーが発生しました:', classError);
                }
            } catch (error) {
                console.error('編集ボタンの処理中にエラーが発生しました:', error);
            }
        });
    });
}

// UI初期化関数
function initializeUI() {
    try {
        // タスク一覧表を表示
        renderTasksTable();
        
        // ブランドデータを表示
        renderBrands();
        
        // ブランド編集ボタンのイベントリスナーを設定
        initEditButtons();
        
        // タスク一覧用イベントリスナーを設定
        setupTasksTableListeners();
        
        // 各種イベントリスナーを設定
        setupEventListeners();
    } catch (error) {
        console.error('UI初期化時にエラーが発生しました:', error);
    }
}
// ブランド編集フォームの作成
function createEditForm(section) {
    try {
        console.log('編集フォームを作成しています:', section.id);
        
        // ブランドIDを取得
        const brandId = section.id;
        
        // 編集対象のブランドを取得
        const brand = brandsData.find(b => b.id === brandId);
        if (!brand) {
            console.error('編集対象のブランドが見つかりません:', brandId);
            return;
        }
        
        // 既にフォームがあれば削除
        const existingForm = section.querySelector('.edit-form');
        if (existingForm) {
            existingForm.remove();
        }
        
        // 編集フォームを作成
        const form = document.createElement('form');
        form.className = 'edit-form';
        form.innerHTML = `
            <!-- 基本情報 -->
            <div class="form-group">
                <label for="name-${brandId}">ブランド名</label>
                <input type="text" id="name-${brandId}" name="name" value="${brand.name}">
            </div>
            <div class="form-group">
                <label for="type-${brandId}">タイプ</label>
                <input type="text" id="type-${brandId}" name="type" value="${brand.type}">
            </div>
            <div class="form-group">
                <label for="awareness-${brandId}">認知度 (%)</label>
                <input type="number" id="awareness-${brandId}" name="awareness" min="0" max="100" value="${brand.awareness}">
            </div>
            <div class="form-group">
                <label for="preference-${brandId}">選好度 (%)</label>
                <input type="number" id="preference-${brandId}" name="preference" min="0" max="100" value="${brand.preference}">
            </div>
            
            <!-- ブランドエクイティ -->
            <h4>ブランドエクイティ</h4>
            <div class="form-group">
                <label for="why-${brandId}">Why</label>
                <textarea id="why-${brandId}" name="why">${brand.equity?.why || ''}</textarea>
            </div>
            <div class="form-group">
                <label for="who-${brandId}">Who</label>
                <textarea id="who-${brandId}" name="who">${brand.equity?.who || ''}</textarea>
            </div>
            <div class="form-group">
                <label for="what-${brandId}">What</label>
                <textarea id="what-${brandId}" name="what">${brand.equity?.what || ''}</textarea>
            </div>
            <div class="form-group">
                <label for="how-${brandId}">How</label>
                <textarea id="how-${brandId}" name="how">${brand.equity?.how || ''}</textarea>
            </div>
            
            <!-- マーケティング戦略 -->
            <h4>マーケティング戦略</h4>
            <div class="form-group">
                <label for="concept-${brandId}">コンセプト</label>
                <textarea id="concept-${brandId}" name="concept">${brand.strategy?.concept || ''}</textarea>
            </div>
            <div class="form-group">
                <label for="positioning-${brandId}">ポジショニング</label>
                <textarea id="positioning-${brandId}" name="positioning">${brand.strategy?.positioning || ''}</textarea>
            </div>
            <div class="form-group">
                <label for="uniqueValue-${brandId}">独自価値</label>
                <textarea id="uniqueValue-${brandId}" name="uniqueValue">${brand.strategy?.uniqueValue || ''}</textarea>
            </div>
            <div class="form-group">
                <label for="targetAudience-${brandId}">対象顧客</label>
                <textarea id="targetAudience-${brandId}" name="targetAudience">${brand.strategy?.targetAudience || ''}</textarea>
            </div>
            
            <!-- OKR/KPI -->
            <h4>OKR・KPI</h4>
            <div class="form-group">
                <label for="objective-${brandId}">目標</label>
                <textarea id="objective-${brandId}" name="objective">${brand.okrKpi?.objective || ''}</textarea>
            </div>
            <div class="form-group">
                <label for="keyResults-${brandId}">主要結果</label>
                <textarea id="keyResults-${brandId}" name="keyResults">${brand.okrKpi?.keyResults?.join('\n') || ''}</textarea>
            </div>
            <div class="form-group">
                <label for="kpis-${brandId}">KPI</label>
                <textarea id="kpis-${brandId}" name="kpis">${brand.okrKpi?.kpis?.join('\n') || ''}</textarea>
            </div>
            
            <div class="form-actions">
                <button type="button" class="save-btn" data-brand-id="${brandId}">保存</button>
                <button type="button" class="cancel-btn">キャンセル</button>
            </div>
        `;
        
        // フォームを追加
        section.querySelector('.brand-grid').appendChild(form);
        
        // 保存ボタンのイベントリスナーを設定
        form.querySelector('.save-btn').addEventListener('click', function() {
            // 編集内容を保存
            saveBrandEdits(brandId);
            
            // 編集モードを終了
            section.classList.remove('editing');
            form.remove();
            
            // 編集ボタンのテキストを元に戻す
            section.querySelector('.edit-button').textContent = '編集';
        });
        
        // キャンセルボタンのイベントリスナーを設定
        form.querySelector('.cancel-btn').addEventListener('click', function() {
            // 編集モードを終了し、変更は保存しない
            section.classList.remove('editing');
            form.remove();
            
            // 編集ボタンのテキストを元に戻す
            section.querySelector('.edit-button').textContent = '編集';
        });
    } catch (error) {
        console.error('編集フォームの作成中にエラーが発生しました:', error);
    }
}

// 注意: 重複していたsaveBrandEdits関数は削除しました
// DOMContentLoadedイベントリスナーは既に1264行目で閉じられています

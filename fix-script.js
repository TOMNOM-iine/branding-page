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
        
        // フォームの入力値を取得 - ブランドエクイティ
        const whyInput = document.getElementById(`why-${brandId}`);
        const whoInput = document.getElementById(`who-${brandId}`);
        const whatInput = document.getElementById(`what-${brandId}`);
        const howInput = document.getElementById(`how-${brandId}`);
        
        // フォームの入力値を取得 - マーケティング戦略
        const conceptInput = document.getElementById(`concept-${brandId}`);
        const positioningInput = document.getElementById(`positioning-${brandId}`);
        const uniqueValueInput = document.getElementById(`uniqueValue-${brandId}`);
        const targetAudienceInput = document.getElementById(`targetAudience-${brandId}`);
        
        // フォームの入力値を取得 - OKR・KPI
        const objectiveInput = document.getElementById(`objective-${brandId}`);
        const keyResultsInput = document.getElementById(`keyResults-${brandId}`);
        const kpisInput = document.getElementById(`kpis-${brandId}`);
        
        // 更新するデータを準備
        const updatedBrand = {
            ...brandsData[brandIndex],
            name: nameInput.value,
            type: typeInput.value,
            awareness: parseInt(awarenessInput.value) || 0,
            preference: parseInt(preferenceInput.value) || 0,
            equity: {
                why: whyInput.value,
                who: whoInput.value,
                what: whatInput.value,
                how: howInput.value
            },
            strategy: {
                concept: conceptInput.value,
                positioning: positioningInput.value,
                uniqueValue: uniqueValueInput.value,
                targetAudience: targetAudienceInput.value
            },
            okrKpi: {
                objective: objectiveInput.value,
                keyResults: keyResultsInput.value.split('\n').filter(line => line.trim() !== ''),
                kpis: kpisInput.value.split('\n').filter(line => line.trim() !== '')
            }
        };
        
        // データを更新
        brandsData[brandIndex] = updatedBrand;
        
        // ローカルストレージに保存
        localStorage.setItem('brandsData', JSON.stringify(brandsData));
        
        // ブランドカードを更新
        const brandCard = document.getElementById(brandId);
        brandCard.innerHTML = ''; // カードの内容をクリア
        
        // ブランドカードを再作成
        const newBrandCard = createBrandCard(updatedBrand);
        Object.keys(newBrandCard.attributes).forEach(key => {
            brandCard.setAttribute(key, newBrandCard.getAttribute(key));
        });
        Array.from(newBrandCard.childNodes).forEach(node => {
            brandCard.appendChild(node);
        });
        
        // 編集ボタンのイベントリスナーを再設定
        initEditButtons();
        
        // Supabaseにも保存（ログイン中のみ）
        if (!isLocalStorageMode()) {
            try {
                const user = await getCurrentUser();
                if (user) {
                    console.log('Supabaseにブランド編集内容を保存します');
                    const { error } = await saveBrandToSupabase(updatedBrand);
                    if (error) {
                        console.error('Supabaseへの保存中にエラーが発生しました:', error);
                    } else {
                        console.log('Supabaseへの保存が完了しました');
                        // ローカルストレージにも保存して同期を維持
                        localStorage.setItem('brandsData', JSON.stringify(brandsData));
                    }
                }
            } catch (saveError) {
                console.error('Supabase保存中に例外が発生しました:', saveError);
                // エラー発生時はローカルストレージには保存
                localStorage.setItem('brandsData', JSON.stringify(brandsData));
            }
        } else {
            console.log('ローカルストレージモードのためSupabaseへの保存はスキップします');
        }
        
        // 保存通知を表示
        showSaveNotification();
        
        return true;
    } catch (error) {
        console.error('ブランド編集内容の保存中にエラーが発生しました:', error);
        return false;
    }
}

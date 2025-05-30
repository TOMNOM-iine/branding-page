// Supabase設定 - 環境変数から取得
const SUPABASE_URL = window.SUPABASE_URL || 'https://vtgpmvkniaoovhlmvcwh.supabase.co';
const SUPABASE_ANON_KEY = window.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ0Z3BtdmtuaWFvb3ZobG12Y3doIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU5ODM3MTMsImV4cCI6MjA2MTU1OTcxM30.vivSbeRz-xfA6iUKVTLM_6w4jW1XwFH9i9qtHAn5QEI';

// Supabaseクライアントの初期化
let supabase;

console.log('Supabase初期化を開始します');
console.log('使用するSupabase URL:', SUPABASE_URL);

try {
  // CDNから読み込んだsupabaseを初期化
  supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  console.log('Supabaseクライアントの初期化が完了しました');
} catch (err) {
  console.error('Supabaseクライアントの初期化中にエラーが発生しました:', err);
  
  // エラーハンドリングのためダミーオブジェクトを作成
  supabase = {
    auth: {
      getUser: () => Promise.resolve({ data: { user: null }, error: new Error('初期化エラー: ' + err.message) }),
      signUp: () => Promise.resolve({ data: null, error: new Error('初期化エラー: ' + err.message) }),
      signInWithPassword: () => Promise.resolve({ data: null, error: new Error('初期化エラー: ' + err.message) }),
      signOut: () => Promise.resolve({ error: new Error('初期化エラー: ' + err.message) })
    },
    from: () => ({
      select: () => ({
        order: () => Promise.resolve({ data: [], error: new Error('初期化エラー: ' + err.message) }),
        eq: () => Promise.resolve({ data: [], error: new Error('初期化エラー: ' + err.message) })
      }),
      insert: () => ({
        select: () => Promise.resolve({ data: [], error: new Error('初期化エラー: ' + err.message) })
      }),
      update: () => ({
        eq: () => ({
          select: () => Promise.resolve({ data: [], error: new Error('初期化エラー: ' + err.message) })
        })
      }),
      delete: () => ({
        eq: () => Promise.resolve({ error: new Error('初期化エラー: ' + err.message) })
      })
    })
  };
}

// 認証状態の取得
async function getCurrentUser() {
  try {
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      console.error('ユーザー情報の取得に失敗しました:', error);
      return null;
    }
    return data?.user;
  } catch (error) {
    console.error('getCurrentUser関数でエラーが発生しました:', error);
    return null;
  }
}

// サインアップ
async function signUp(email, password) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    return { data, error };
  } catch (error) {
    console.error('signUp関数でエラーが発生しました:', error);
    return { data: null, error };
  }
}

// サインイン
async function signIn(email, password) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  } catch (error) {
    console.error('signIn関数でエラーが発生しました:', error);
    return { data: null, error };
  }
}

// サインアウト
async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    return { error };
  } catch (error) {
    console.error('signOut関数でエラーが発生しました:', error);
    return { error };
  }
}

// ブランド一覧の取得
async function fetchBrands() {
  try {
    const { data, error } = await supabase
      .from('brands')
      .select('*')
      .order('name');
    
    if (error) {
      console.error('ブランド一覧の取得に失敗しました:', error);
    } else if (data) {
      console.log(`${data.length}件のブランドデータを取得しました`);
    }
    
    return { data, error };
  } catch (error) {
    console.error('fetchBrands関数でエラーが発生しました:', error);
    return { data: null, error };
  }
}

// ブランドの追加
async function addBrand(brand) {
  try {
    const { data, error } = await supabase
      .from('brands')
      .insert([brand])
      .select();
    
    if (error) {
      console.error('ブランドの追加に失敗しました:', error);
    } else {
      console.log('ブランドを追加しました:', data);
    }
    
    return { data, error };
  } catch (error) {
    console.error('addBrand関数でエラーが発生しました:', error);
    return { data: null, error };
  }
}

// ブランドの更新
async function updateBrand(id, updates) {
  try {
    const { data, error } = await supabase
      .from('brands')
      .update(updates)
      .eq('id', id)
      .select();
    
    if (error) {
      console.error(`ブランド(ID: ${id})の更新に失敗しました:`, error);
    } else {
      console.log(`ブランド(ID: ${id})を更新しました`);
    }
    
    return { data, error };
  } catch (error) {
    console.error('updateBrand関数でエラーが発生しました:', error);
    return { data: null, error };
  }
}

// ブランドの削除
async function deleteBrand(id) {
  try {
    const { error } = await supabase
      .from('brands')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error(`ブランド(ID: ${id})の削除に失敗しました:`, error);
    } else {
      console.log(`ブランド(ID: ${id})を削除しました`);
    }
    
    return { error };
  } catch (error) {
    console.error('deleteBrand関数でエラーが発生しました:', error);
    return { error };
  }
}

// タスク一覧の取得
async function fetchTasks(brandId = null) {
  try {
    let query = supabase.from('tasks').select('*');
    
    if (brandId) {
      query = query.eq('brand_id', brandId);
    }
    
    const { data, error } = await query.order('id');
    
    if (error) {
      console.error('タスク一覧の取得に失敗しました:', error);
    } else if (data) {
      console.log(`${data.length}件のタスクデータを取得しました`);
    }
    
    return { data, error };
  } catch (error) {
    console.error('fetchTasks関数でエラーが発生しました:', error);
    return { data: null, error };
  }
}

// タスクの追加
async function addTask(task) {
  try {
    const { data, error } = await supabase
      .from('tasks')
      .insert([task])
      .select();
    
    if (error) {
      console.error('タスクの追加に失敗しました:', error);
    } else {
      console.log('タスクを追加しました:', data);
    }
    
    return { data, error };
  } catch (error) {
    console.error('addTask関数でエラーが発生しました:', error);
    return { data: null, error };
  }
}

// タスクの更新
async function updateTask(id, updates) {
  try {
    const { data, error } = await supabase
      .from('tasks')
      .update(updates)
      .eq('id', id)
      .select();
    
    if (error) {
      console.error(`タスク(ID: ${id})の更新に失敗しました:`, error);
    } else {
      console.log(`タスク(ID: ${id})を更新しました`);
    }
    
    return { data, error };
  } catch (error) {
    console.error('updateTask関数でエラーが発生しました:', error);
    return { data: null, error };
  }
}

// タスクの削除
async function deleteTask(id) {
  try {
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error(`タスク(ID: ${id})の削除に失敗しました:`, error);
    } else {
      console.log(`タスク(ID: ${id})を削除しました`);
    }
    
    return { error };
  } catch (error) {
    console.error('deleteTask関数でエラーが発生しました:', error);
    return { error };
  }
}

// ローカルストレージモードの設定と取得
function setLocalStorageMode(enabled) {
  localStorage.setItem('useLocalStorage', enabled ? 'true' : 'false');
  console.log(`ローカルストレージモードを ${enabled ? '有効' : '無効'} に設定しました`);
}

function isLocalStorageMode() {
  return localStorage.getItem('useLocalStorage') === 'true';
}

// Supabaseブランドデータの保存
async function saveBrandToSupabase(brand) {
  try {
    if (!supabase) {
      return { error: new Error('Supabaseクライアントが初期化されていません') };
    }
    
    // ユーザーがログインしているか確認
    const user = await getCurrentUser();
    if (!user) {
      return { error: new Error('ログインしていないためSupabaseに保存できません') };
    }
    
    console.log(`ブランドデータをSupabaseに保存: ${brand.id}`);
    
    // 既存のブランドか確認
    const { data: existingBrand, error: checkError } = await supabase
      .from('brands')
      .select('id')
      .eq('id', brand.id)
      .maybeSingle();
    
    if (checkError) {
      console.error('ブランド存在チェックエラー:', checkError);
      return { error: checkError };
    }
    
    let result;
    
    // タスクデータを一時保存（ブランド更新後に個別に保存するため）
    const tasks = [...(brand.tasks || [])];
    
    // APIの容量制限に対応するため、一時的にtasksを削除
    const brandWithoutTasks = { ...brand };
    delete brandWithoutTasks.tasks;
    
    if (existingBrand) {
      // 既存のブランドを更新
      console.log(`既存のブランド(${brand.id})を更新します`);
      result = await supabase
        .from('brands')
        .update(brandWithoutTasks)
        .eq('id', brand.id)
        .select();
    } else {
      // 新規ブランドを作成
      console.log(`新規ブランド(${brand.id})を作成します`);
      result = await supabase
        .from('brands')
        .insert([brandWithoutTasks])
        .select();
    }
    
    if (result.error) {
      console.error('ブランド保存エラー:', result.error);
      return { error: result.error };
    }
    
    console.log('ブランドの保存が完了しました');
    
    // タスクの更新処理
    if (tasks && tasks.length > 0) {
      console.log(`ブランド(${brand.id})のタスク(${tasks.length}件)を更新します`);
      
      // 既存のタスクを取得
      const { data: existingTasks, error: tasksError } = await supabase
        .from('tasks')
        .select('id')
        .eq('brand_id', brand.id);
      
      if (tasksError) {
        console.error('既存タスク取得エラー:', tasksError);
        return { data: result.data, success: true, warning: '既存タスクの取得に失敗しました' };
      }
      
      // 既存タスクIDのマップを作成
      const existingTaskIds = new Set((existingTasks || []).map(t => t.id));
      
      // タスク更新用のバッチ処理
      const updatePromises = tasks.map(async task => {
        if (existingTaskIds.has(task.id)) {
          // 既存タスクを更新
          const { error: updateErr } = await supabase
            .from('tasks')
            .update({
              text: task.text,
              completed: task.completed,
              important: task.important
            })
            .eq('id', task.id);
          
          if (updateErr) {
            console.error(`タスク(${task.id})の更新エラー:`, updateErr);
          } else {
            console.log(`タスク(${task.id})を更新しました`);
          }
        } else {
          // 新規タスクを登録
          const { error: insertErr } = await supabase
            .from('tasks')
            .insert([{
              brand_id: brand.id,
              text: task.text,
              completed: task.completed,
              important: task.important
            }]);
          
          if (insertErr) {
            console.error('新規タスク追加エラー:', insertErr);
          } else {
            console.log('新規タスクを追加しました');
          }
        }
      });
      
      // 全てのタスク更新を待機
      await Promise.all(updatePromises);
      console.log('全てのタスク更新が完了しました');
    }
    
    return { data: result.data, success: true };
  } catch (error) {
    console.error('saveBrandToSupabase関数でエラーが発生:', error);
    return { error };
  }
}

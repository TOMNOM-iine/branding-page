// Supabase設定 - 環境変数から取得
const SUPABASE_URL = window.SUPABASE_URL || 'https://vtgpmvkniaoovhlmvcwh.supabase.co';
const SUPABASE_ANON_KEY = window.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ0Z3BtdmtuaWFvb3ZobG12Y3doIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU5ODM3MTMsImV4cCI6MjA2MTU1OTcxM30.vivSbeRz-xfA6iUKVTLM_6w4jW1XwFH9i9qtHAn5QEI';

// Supabaseクライアントの初期化
let supabase;

console.log('Supabase初期化を開始します');
console.log('使用するSupabase URL:', SUPABASE_URL);

try {
  // CDNから読み込んだsupabaseを初期化
  supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
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
    
    // 既存のブランドか確認
    const { data: existingBrand, error: checkError } = await supabase
      .from('brands')
      .select('id')
      .eq('id', brand.id)
      .maybeSingle();
    
    if (checkError) {
      return { error: checkError };
    }
    
    let result;
    
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
      return { error: result.error };
    }
    
    return { data: result.data, success: true };
  } catch (error) {
    return { error };
  }
}

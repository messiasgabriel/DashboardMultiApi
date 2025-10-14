import axios from "axios";

console.log('🔍 Verificando .env...');
console.log('API Key encontrada?', !!import.meta.env.VITE_API_KEY);
console.log('Primeiros 5 caracteres:', import.meta.env.VITE_API_KEY?.substring(0, 5));

// Configuração base do Axios
export const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'https://api.themoviedb.org/3',
    timeout: 10000,
    headers : {
        'Content-type': 'application/json',
    },
});

// Request Interceptor
api.interceptors.request.use(
    (config) =>{
        console.log('[REQUEST] enviando para:', config.baseURL );
        console.log('[REQUEST] Parâmetros:', config.params)
        const apiKey = import.meta.env.VITE_API_KEY;
        if(apiKey) {
            config.params = {
                ...config.params,
                api_key : apiKey,
            };
        }
        console.log('✅ [REQUEST] Parâmetros finais:', config.params);
        return config;
    },
    (error) =>{
        console.error('[REQUEST ERROR]:', error)
       return Promise.reject(error)
    } 
        
)

// Response Interceptor
api.interceptors.response.use(
    (response) => {
    console.log('✅ [RESPONSE] Sucesso!', response.status);
    console.log('📥 [RESPONSE] Dados:', response.data);
    return response;
  },
  (error) => {
    if (error.response) {
      console.error('❌ [RESPONSE ERROR] Status:', error.response.status);
      console.error('❌ [RESPONSE ERROR] Data:', error.response.data);
    } else if (error.request) {
      console.error('❌ [NETWORK ERROR] Sem resposta');
    } else {
      console.error('❌ [CONFIG ERROR]:', error.message);
    }
    return Promise.reject(error);
  }
)
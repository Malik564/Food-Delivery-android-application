export const SignInReducer = (state,action) =>{
     console.log('At reducer :' ,action.userToken);
    switch(action.type){
        
        case  'UPDATE_SIGN_IN':
            return{
                ...state,
                userToken:action.userToken
            }
        case 'SIGN_OUT':
            return{
             ...state,
                userToken:null
            }
        
        default:
            return state
    }
}
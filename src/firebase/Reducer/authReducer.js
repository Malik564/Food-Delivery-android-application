export const SignInReducer = (state,action) =>{
    switch(action.type){
        case 'RETRIVE_TOKEN':
            return{
            
                userToken:action.userToken
            }
        case  'UPDATE_SIGN_IN':
            return{
            
                userToken:action.userToken
            }
        case 'SIGN_OUT':
            return{
            
                userToken:null
            }
        default:
            return state
    }
}
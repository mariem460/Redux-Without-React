console.clear()
//actions
const createPolicy = (name, amount)=> {
  return {
    type: "CREATE_POLICY",
    payload: {
      name: name,
      amount: amount
    }
  }
}
const deletePolicy = (name)=> {
  return {
    type: "DELETE_POLICY",
    payload: {
      name: name
    }
  }
}
const createClaim = (name, amountToCollect)=> {
  return {
    type: "CREATE_CLAIM",
    payload: {
      name: name,
      amountToCollect: amountToCollect
      
    }
  }
}
//reducers

const claims = (oldListOfClaims=[], action) => {
  //oldListOfClaims is the STATE
  if(action.type === 'CREATE_CLAIM'){
    //always try to avoid modify the state, instead return new one 
    //it would be modified with .PUSH but no this is to avoid
    return [...oldListOfClaims, action.payload]
    
  }
  return oldListOfClaims
}
const accounting = (bagOfMoney = 100, action) => {
  if(action.type === "CREATE_CLAIM"){
    return bagOfMoney - action.payload.amountToCollect
  }else if (action.type === "CREATE_POLICY"){
    return bagOfMoney + action.payload.amount
    
  }
  return bagOfMoney
}

const policies = (listOfPolicies = [], action) => {
  if(action.type === "CREATE_POLICY"){
    return [...listOfPolicies, action.payload.name]
  }else if (action.type === "DELETE_POLICY"){
    //filter is the nethod to make new array doesnt contain the name of action payload
    return listOfPolicies.filter(policyName => policyName.name !== action.payload.name)
  }
  return listOfPolicies
  
}
 const {createStore, combineReducers} = Redux;

const allReducers = combineReducers({
  policies: policies,
  accounting: accounting,
  claims: claims
})

const store = createStore(allReducers)


store.dispatch(createPolicy("mariem Oueslati", 10))
store.dispatch(createPolicy("Ayoub", 20))
store.dispatch(createPolicy("mariem Oueslati", 10))
store.dispatch(createPolicy("abie", 60))
console.log(store.getState())
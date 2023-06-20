export const AuthReducer = (state: any, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case "LOGIN": {
            return {
                _currentUser: action.payload,
                get currentUser() {
                    return this._currentUser;
                },
                set currentUser(value) {
                    this._currentUser = value;
                },
            };
        }
             case "LOGOUT": {
            return {
                currentUser: null,
            };
        }
        default:
            return state;
    }
}

// // export default AuthReducer;
// interface State {
//   currentUser: any; // Replace 'any' with the appropriate type for the currentUser
// }

// interface Action {
//   type: string;
//   payload?: any; // Replace 'any' with the appropriate type for the payload
// }

// const AuthReducer = (state: State, action: Action): State => {
//   switch (action.type) {
//     case "LOGIN": {
//       return {
//         ...state,
//         currentUser: action.payload,
//       };
//     }
//     case "LOGOUT": {
//       return {
//         ...state,
//         currentUser: null,
//       };
//     }
//     default:
//       return state;
//   }
// };

// export default AuthReducer;
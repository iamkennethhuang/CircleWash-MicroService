import localstorageService from '../services/localstorageService';

export function ProtectedContent(props) {
    const {children, role, perms, user} = props;
    if(role.includes(user.role)){
        return children
    }
    else{
        return null;
    }
}

export function ProtectdContentWithPerm(props) {
    const {children, perms, user} = props;
    for(let i = 0; i < perms.length; i++){
        if(!perms.includes(user.perms[i])){
            return null;
        }
    }
    return children;
}

export function ProtectdContentWithRole(props) {
    const {children, role, user} = props;
    if(role.includes(user.role)){
        return children
    }
    else{
        return null;
    }
}
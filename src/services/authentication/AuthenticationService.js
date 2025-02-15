import { useToastService } from "@/shared/ToastService";
import { useUserService } from "../api/UserService";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export const useAuthenticationService = () => {
    const userService = useUserService()
    const { showToast } = useToastService();
    const router = useRouter();
    const store = useStore();

    const Login = (email, password) => {
        userService.Login(email, password)
            .then(response => {
                ClearLocalStorage();
                const data = response.data.data
                localStorage.setItem('token', data.token);
                localStorage.setItem('userInfo', JSON.stringify({ id: data.id, name: data.name }));

                store.commit('setUser', { id: data.id, name: data.name });
                router.push({ name: 'restaurant' })
            }).catch(err => { })
    }

    const LogOut = () => {
        ClearLocalStorage();
        router.push({ name: 'login' })
    }

    const ClearLocalStorage = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userInfo');
        localStorage.removeItem('restaurant');
    }

    const GetUser = () => {
        const user = JSON.parse(localStorage.getItem('userInfo'));
        return {
            id: user.id,
            name: user.name
        }
    }

    return {
        Login,
        LogOut,
        GetUser
    }
}
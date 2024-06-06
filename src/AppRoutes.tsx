import {Navigate, Route, Routes} from "react-router-dom";
import Layout from "@/layouts/Layout.tsx";
import HomePage from "@/pages/HomePage.tsx";
import AuthCallBackPage from "@/pages/AuthCallBackPage.tsx";
import UserProfilePage from "@/pages/UserProfilePage.tsx";
import ProtectedRoute from "@/auth/ProtectedRoute.tsx";
import ManageRestaurantPage from "@/pages/ManageRestaurantPage.tsx";
import SearchPage from "@/pages/SearchPage.tsx";
import DetailPage from "@/pages/DetailPage.tsx";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path={'/'} element={
                <Layout showHero={true}>
                    <HomePage/>
                </Layout>
                }
            />
            <Route path={'/auth-callback'} element={ <AuthCallBackPage/> }/>

            <Route element={<ProtectedRoute/>}>
                <Route path={'/user-profile'} element={
                    <Layout>
                        <UserProfilePage />
                    </Layout>
                }></Route>
            </Route>
            <Route path={'/manage-restaurant'} element={
                <Layout>
                    <ManageRestaurantPage/>
                </Layout>
            }/>
            <Route path={'/search/:city'}
                element={
                    <Layout showHero={false}>
                        <SearchPage />
                    </Layout>
                }/>
            <Route
                path={'/detail/:restaurantId'}
                element={
                    <Layout showHero={false}>
                        <DetailPage />
                    </Layout>
                }
            />


            <Route path={'*'} element={<Navigate to={'/'}/>}></Route>
        </Routes>
    );
}

export default AppRoutes;
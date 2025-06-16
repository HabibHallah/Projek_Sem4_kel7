import ErrorPage from "../components/ErrorPage";

export default function Error404() {
    return (
        <div>
        <ErrorPage
            Kode="404"
            Deskripsi="Page Not Found"
            Gambar="img/error_404.png">
            </ErrorPage>
        </div>
    );
}


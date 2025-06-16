import ErrorPage from "../components/ErrorPage";

export default function Error403() {
    return (
        <div>
        <ErrorPage
            Kode="403"
            Deskripsi="403 Forbidden"
            Gambar="img/error_403.png">
            </ErrorPage>
        </div>
    );
}


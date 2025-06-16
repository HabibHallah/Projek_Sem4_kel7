import ErrorPage from "../components/ErrorPage";

export default function Error401() {
    return (
        <div>
        <ErrorPage
            Kode="401"
            Deskripsi="Unauthorized"
            Gambar="img/error_401.png">
            </ErrorPage>
        </div>
    );
}
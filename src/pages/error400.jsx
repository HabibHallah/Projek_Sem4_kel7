import ErrorPage from "../components/ErrorPage";

export default function Error400() {
    return (
        <div>
        <ErrorPage
            Kode="400"
            Deskripsi="Bad Request"
            Gambar="img/error_400.png">
            </ErrorPage>
        </div>
    );
}
           
export default function ErrorPage ({Kode, Deskripsi, Gambar}){
    return(
        <div id="error-container" className="flex items-center justify-center mt-[40px]">
            <div className="bg-white rounded-2xl shadow-md p-12 w-190 h-150 flex flex-col items-center text-center">
                <div className="text-merah font-poppins-regular font-[1000] text-[24px]">Oppss . . . .</div>
                <div className="text-merah font-poppins-extrabold font-[1000] text-[48px] ">{Kode}</div>
                <div><img src={Gambar} className="w-80 mt-[5px]" alt="" /></div>
                <div className="text-merah font-poppins-regular font-[1000] text-[24px] mt-[20px]">Page Not Found</div>
                <div className="text-merah font-poppins-regular font-[1000] text-[14px] w-130 mt-[30px]">
                    <p>"{Deskripsi}"</p>
                </div>
            </div>
        </div>
    )
}
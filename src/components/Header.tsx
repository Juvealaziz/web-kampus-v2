export default function Navhead(){
    return(
        <nav className="bg-gray-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-1   flex text-gray-100">
          <ul className="flex gap-16 ">

            <li><a href="/Akreditasi"className='text-sm'>Akreditasi</a></li>
            <li><a href="https://ejurnal-unisap.ac.id/index.php/index/login/signIn"className='text-sm'>E-Journal</a></li>
            

          </ul>

           <ul className="flex gap-16  ml-auto">

            <li><a href="https://pmb.unisap.ac.id/login?lang=id" className='text-sm'>Info PMB Unisap</a></li>

            

          </ul>




        </div>
        
      </nav>
    );

}
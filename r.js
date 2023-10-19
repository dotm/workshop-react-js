import { useState } from 'react';

export default function MyApp() {
  const [searchTerm, setSearchTerm] = useState("")
  const [images, setImages] = useState([
    {
      id: "1",
      title: "Image Pertama",
      imageUrl: "https://place-hold.it/300x500",
    },
    {
      id: "2",
      title: "Image Kedua",
      imageUrl: "https://www.adobe.com/content/dam/cc/us/en/creativecloud/photography/discover/stock-photography/thumbnail.jpeg",
    },
    {
      id: "3",
      title: "Image Ketiga",
      imageUrl: "https://placehold.co/600x400",
    },
  ])

  function getFilteredImages(){
    if(searchTerm === ""){
      return images
    }

    const lowerCasedSearchTerm = searchTerm.toLowerCase()
    return images.filter(image =>
      image.title.toLowerCase().includes(lowerCasedSearchTerm) ||
      image.imageUrl.toLowerCase().includes(lowerCasedSearchTerm)
    )
  }

  return (
    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 py-2">
      <div className="text-center shadow-lg my-3 mx-auto max-w-7xl py-3 px-3 sm:px-6 lg:px-8 bg-white">
        <label htmlFor="search-gallery" className="sr-only">
          Galeri Gambar
        </label>
        <input
          type="text"
          name="search-gallery"
          id="search-gallery"
          className="block w-full rounded-md p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="Cari judul atau url gambar"
          value = {searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </div>
      {
        getFilteredImages().length === 0 ? <></> :
        <div className="text-center shadow-lg my-3 mx-auto max-w-7xl py-8 px-3 sm:px-6 lg:px-8 bg-white">
          <p className='text-sm font-medium mb-4 text-gray-900'>Silahkan Klik Gambar untuk Melakukan Edit</p>
          <ul role="list" className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
            {getFilteredImages().map((item) => (
              <li key={item.id}
                className="relative hover:opacity-50 cursor-pointer"
                onClick={() => alert("Fungsi edit belum dibuat")}
              >
                <img src={item.imageUrl} alt="" className="m-auto pointer-events-none h-40 w-40 object-cover group-hover:opacity-75" />
                <p className="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900">{item.title}</p>
              </li>
            ))}
          </ul>
        </div>
      }
    </div>
  )
}
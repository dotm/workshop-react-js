import { useState } from 'react';

export default function MyApp() {
  const [shouldShowAddImageForm, setShouldShowAddImageForm] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [newImageTitle, setNewImageTitle] = useState("")
  const [newImageUrl, setNewImageUrl] = useState("")
  const [imageUnderEdit, setImageUnderEdit] = useState(null)
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
        {
          shouldShowAddImageForm ?
          <>
            <div className='mt-10 mb-2 flex flex-col gap-2'>
              <p className='text-sm font-medium text-gray-900'>Tambahkan Gambar Baru</p>
              <div>
                <label htmlFor="new-image-title" className="sr-only">
                  Judul Gambar
                </label>
                <input
                  type="text"
                  name="new-image-title"
                  id="new-image-title"
                  className="block w-full rounded-md p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Judul Gambar"
                  value = {newImageTitle}
                  onChange={(event) => setNewImageTitle(event.target.value)}
                />
              </div>
              <div>
                <label htmlFor="new-image-url" className="sr-only">
                  URL Gambar
                </label>
                <input
                  type="text"
                  name="new-image-url"
                  id="new-image-url"
                  className="block w-full rounded-md p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="URL Gambar"U
                  value = {newImageUrl}
                  onChange={(event) => setNewImageUrl(event.target.value)}
                />
              </div>
              <div className='flex w-full justify-evenly'>
                <button
                  type="button"
                  className="inline-flex items-center gap-x-1.5 rounded-md disabled:bg-slate-600 bg-red-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                  onClick={() => setShouldShowAddImageForm(shown => !shown)}
                >
                  Batalkan
                </button>
                <button
                  type="button"
                  className="inline-flex items-center gap-x-1.5 rounded-md disabled:bg-slate-600 bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={function(){
                    const now = (new Date()).toISOString()
                    setImages([...images, {id: now, title: newImageTitle, imageUrl: newImageUrl}])
                    setNewImageTitle("")
                    setNewImageUrl("")
                    setShouldShowAddImageForm(false)
                  }}
                >
                  Simpan
                </button>
              </div>
            </div>
          </>
          :
          <>
            <div className='m-4'></div>
            <button
              type="button"
              className="inline-flex items-center gap-x-1.5 rounded-md disabled:bg-slate-600 bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={() => setShouldShowAddImageForm(shown => !shown)}
            >
              Tambah Gambar
            </button>
          </>
        }
      </div>
      {
        imageUnderEdit !== null || getFilteredImages().length === 0 ? <></> :
        <div className="text-center shadow-lg my-3 mx-auto max-w-7xl py-8 px-3 sm:px-6 lg:px-8 bg-white">
          <p className='text-sm font-medium mb-4 text-gray-900'>Silahkan Klik Gambar untuk Melakukan Edit</p>
          <ul role="list" className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
            {getFilteredImages().map((item) => (
              <li key={item.id}
                className="relative hover:opacity-50 cursor-pointer"
                onClick={() => setImageUnderEdit(item)}
              >
                <img src={item.imageUrl} alt="" className="m-auto pointer-events-none h-40 w-40 object-cover group-hover:opacity-75" />
                <p className="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900">{item.title}</p>
              </li>
            ))}
          </ul>
        </div>
      }
      {
        imageUnderEdit === null ? <></> :
        <div className="text-center shadow-lg my-3 mx-auto max-w-7xl py-8 px-3 sm:px-6 lg:px-8 bg-white">
          <div className='mt-2 mb-2 flex flex-col gap-2'>
            <p className='text-sm font-medium text-gray-900'>Edit Gambar Ini</p>
            <img src={imageUnderEdit.imageUrl} alt="" className="m-auto pointer-events-none h-40 w-40 object-cover group-hover:opacity-75" />
            <div>
              <label htmlFor="new-image-title" className="sr-only">
                Judul Gambar
              </label>
              <input
                type="text"
                name="new-image-title"
                id="new-image-title"
                className="block w-full rounded-md p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Judul Gambar"
                value = {imageUnderEdit.title}
                onChange={function(event){
                  setImageUnderEdit(function(imageData){
                    return {...imageData, title: event.target.value}
                  })
                }}
              />
            </div>
            <div>
              <label htmlFor="new-image-url" className="sr-only">
                URL Gambar
              </label>
              <input
                type="text"
                name="new-image-url"
                id="new-image-url"
                className="block w-full rounded-md p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="URL Gambar"U
                value = {imageUnderEdit.imageUrl}
                onChange={function(event){
                  setImageUnderEdit(function(imageData){
                    return {...imageData, imageUrl: event.target.value}
                  })
                }}
              />
            </div>
            <div className='flex w-full justify-evenly'>
              <button
                type="button"
                className="inline-flex items-center gap-x-1.5 rounded-md disabled:bg-slate-600 bg-red-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                onClick={() => setImageUnderEdit(null)}
              >
                Batalkan
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-x-1.5 rounded-md disabled:bg-slate-600 bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={function(){
                  setImages(images.map(function(imageData){
                    if(imageData.id !== imageUnderEdit.id){
                      return imageData //unchanged
                    }
                    return imageUnderEdit //new data
                  }))
                  setImageUnderEdit(null)
                }}
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      }
    </div>
  )
}
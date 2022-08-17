import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import NotFound from "./NotFound";
//! useParams'ı yeni sayfa için olan id ve name gibi parametreleri almamızı sağlıyor.bu parametreyi de ilk başta navigate'in içine yazdığımız parametreler

//!useLocation da sıkıntı şu direk uzun olan linki bilirsek o zaman veriler gelmez ilk önce ana sayfaya girip ordan açılması gerekiyor o yüzden giğeri kullanmak daha mantıklı ancak useLocationda da fetch işlemini yapmamış olıcaz.
const InstructorDetail = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  //const location = useLocation()
  // const inst = useLocation()

  const [inst, setInst] = useState(null);
  //!burada boş array[] vardı şimdi null yaptık inst boş değer atadık.
  const [error, setError] = useState(false);

  
  //!burada linkler valid olsun diye tekrar fetch işlemi yaptık
  //!render dan sonra bura çalışır.
  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((res) => {
        if (!res.ok) {
          //!res true değilse problem var o yüzden buraya bakmak gerekiyor.responce dönene kdarki geçen süreyi biz kulanıcay loading şeklinde göstermek için yapıyoruz.
          setError(true);
          throw new Error("Something went wrong");

          //!throw new Error deyince uygulama res.json() gitmez catch'e gider.

        }
        return res.json();
      })
      //!responce dönmezse catch gider onun dışında gitmez sıkıntı burda başlıyor

      .then((data) => setInst(data))
      .catch((err) => console.log(err));
      //! burada clg devoloperların işi biz bunu kullanıcaya loading şeklinde göstermek için değişken error useState ini kullandık. 
  }, [id]);

  console.log(inst)

  //?bütün html elementlerinin return edilmesi gerekiyor unutma
  if (error) {
    //!hiç veri gelmezse notFounda döndürüyor.Eğer nofFounda girmezsede else giriyor aradadaresimçıkıyor onu engellemek için oraya "Data is Fetching yazısı yerleştiriyoruz" böylece arada resim çıkmadan o çııkıyor ve sonra 404 yazısı geliyor.
    return <NotFound />;
  }else if(!inst){
    //!inst null sa yani false ise yani veri gelmediyse veri gelene kadar bana bunu döndür diyoruz.hata olursa error çalışır yukarıya gider hata yoksa aşağısı çalışır.
    //!ilk render de bu çalışır
    return(
      <div className="text-center">
        <h2>Data is Fetching</h2>
      </div>
    )
  }
    else {
    return (
      <div className='text-center'>
        <h3>{inst.name}</h3>
        <img
          className='w-50'
          src={`https://avatars.dicebear.com/v2/avataaars/${id}.svg`}
          alt=''
        />
        <h4>{inst.email}</h4>
        <h5>{inst.phone}</h5>
        <div>
          <button
            onClick={() => navigate("/")}
            className='btn btn-success me-2 '
          >
            Home
          </button>
          <button onClick={() => navigate(-1)} className='btn btn-warning'>
            Go Back
          </button>
        </div>
      </div>
    );
  }
};

export default InstructorDetail;

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Instructors = () => {
  const navigate = useNavigate();

  const [instructors, setInstructors] = useState([]);

  const getInstructors = () => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setInstructors(data))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getInstructors();
  }, []);

  return (
    <div className='container text-center mt-4'>
      <h1>INSTRUCTOR LIST</h1>
      <div className='row justify-content-center g-4'>
        {instructors?.map((inst) => {
          const { id, name } = inst;
          return (
            <div
              className='col-sm-12 col-md-6 col-lg-4'
              key={id}
              //?Relative path
              onClick={() => navigate(`${id}`)}

              //?Absolute path
              // onClick={() => navigate(`/instructors/${id}`)}

              // onClick={() => navigate(`/instructors/${id}`, { state:inst})}
              //! burada direk state yazıp inst olarak da gönderebiliriz karşıdan da useLocation olarak yakalamamız gerekiyor. Props gibi. navigate ile veriyi gönderebiliriz bu şekilde
              style={{ cursor: "pointer" }}
            >
              {/* burada id değişkenin oldğu sayfaya git diyoruz elemnt üstüne tıkladığında oraya gidecek detay sayfası için. 
              -Ayrıca navigat ile inst bilgisini objectini de gönderebiliyoruz. burada direk linki yazarsak bu olaydan dolayı valid olmaz çünkü sayfları tekte açıp valid yapılması gerekiyor  direk yazılırsa açılmaz ama tek tek gidersek açılır.direk props olarak gönderilmiyor bu şekilde link üzerinden göderebiliyoruz id yi. */}
              <img
                src={`https://avatars.dicebear.com/v2/avataaars/${id}.svg`}
                alt=''
              />
              <h6>{name}</h6>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Instructors;

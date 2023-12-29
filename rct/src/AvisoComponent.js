import { useParams } from 'react-router-dom';

function AvisoComponent() {
  const { id } = useParams();

  return (
    <div>
      This is aviso = {id}
    </div>
  );
}

export default AvisoComponent;
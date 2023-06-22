import { useContext } from 'react'
import Alerta from '../Alerta';
import PostsContext from './PlayersContext';

function Formulario() {

    const { objeto, handleChange, acaoCadastrar,  alerta } = useContext(PostsContext);

    return (
        <div className="modal fade" id="modalEdicao" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">            
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Player</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form id="formulario" onSubmit={acaoCadastrar}>
                        <div className="modal-body">
                            <Alerta alerta={alerta} />
                            <div className="form-group">
                                <label htmlFor="txtID" className="form-label">
                                    ID
                                </label>
                                <input
                                    type="text"
                                    readOnly
                                    className="form-control"
                                    id="txtID"
                                    name="id"
                                    value={objeto.id}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="txtPosicao" className="form-label">
                                    Posição
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="txtPosicao"
                                    name="posicao"
                                    value={objeto.posicao}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="txtOverall" className="form-label">
                                    Overall
                                </label>
                                <textarea 
                                    
                                    className="form-control"
                                    id="txtOverall"
                                    name="overall"
                                    value={objeto.overall}
                                    onChange={handleChange}
                                    required
                                />
                            </div>     
                        </div>
                        <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                            <button type="submit" className="btn btn-success" >
                                Salvar  <i className="bi bi-save"></i>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
}

export default Formulario;
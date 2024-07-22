import { Outlet, Link } from "react-router-dom";

function Inicial() {
    return(
        <div>
            <h1>Abas Bank</h1>
            <div>
                <Link to='listagem'>
                    <button>Nova Conta</button>
                </Link>
                <p>Não existe conta cadastrada</p>
            </div>
            
            <Outlet />
        </div>
    );
}

export default Inicial;
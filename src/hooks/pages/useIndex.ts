import { useEffect, useState } from "react";
import { Professor } from "../../@types/professor";
import { ApiService } from "../../services/ApiServices";

export function useIndex() {
    const [listaProfessores, setListaProfessores] = useState<Professor[]>([    ]);
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [professorSelecionado, setprofessorSelecionado] = useState<Professor | null>(null);
    const [mensagem,setMensagem] = useState('')

    useEffect(()=>{
        ApiService.get('/professores/').then((response)=>{
            setListaProfessores(response.data);
        })
    },[]);

    useEffect(()=>{
        limparFormulario();
    },[professorSelecionado])

    function marcarAula(){
        if(professorSelecionado !== null){
            if(validarDadosAula()){
                ApiService.post('/professores/'+professorSelecionado.id+'/aulas',{
                    nome,
                    email
                }).then(()=>{
                    setprofessorSelecionado(null);
                    setMensagem('Cadastrado com sucesso')
                }).catch((erro)=>{
                    setMensagem(erro)
                });
            }else{
                setMensagem('Preencha os dados corretamente')
            }
        }
    }
    function validarDadosAula(){
        return nome.length>0 && email.length>0;
    }
    function limparFormulario(){
        setNome('');
        setEmail('');
    }
    return {
       listaProfessores,
       nome,
       setNome,
       email,
       setEmail,
       professorSelecionado,
       setprofessorSelecionado,
       marcarAula,
       mensagem,
       setMensagem,
    }
}
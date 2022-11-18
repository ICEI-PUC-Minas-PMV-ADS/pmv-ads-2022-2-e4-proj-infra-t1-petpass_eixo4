namespace PetPassBackend.Contracts
{
    public interface IRepositoryWrapper 
    {
        IPetRepository Pet { get; }
        IVacinaRepository Vacina { get; }
        IUsuarioRepository Usuario { get; }
        IRegistroVacinaRepository Registro { get; }
        IUsuarioPetRepository UsuariosPets { get; }
        Task Save();
    }
}

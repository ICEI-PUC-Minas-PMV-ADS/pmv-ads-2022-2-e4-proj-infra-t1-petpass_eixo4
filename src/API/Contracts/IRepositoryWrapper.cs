namespace PetPassBackend.Contracts
{
    public interface IRepositoryWrapper
    {
        IPetRepository Pet { get; }
        IVacinaRepository Vacina { get; }
        IUsuarioRepository Usuario { get; }
        void Save();
    }
}

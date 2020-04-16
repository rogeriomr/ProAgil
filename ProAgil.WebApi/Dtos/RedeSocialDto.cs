using System.ComponentModel.DataAnnotations;

namespace ProAgil.WebApi.Dtos
{
    public class RedeSocialDto
    {
        public int Id { get; set; }

        [Required (ErrorMessage="O Nome da Rede Social é Obrigatório")]
        public string Nome { get; set; }

        [Required (ErrorMessage="O Link da Rede Social é Obrigatório")]
        public string URL { get; set; }
    }
}
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ProAgil.WebApi.Dtos
{
    public class PalestranteDto
    {
        public int Id { get; set; }

        [Required (ErrorMessage="O Nome do Palestrante é Obrigatorio")]
        public string Nome { get; set; }

        [Required (ErrorMessage="O Curriculo do Palestrante é Obrigatorio")]
        public string MiniCurriculo { get; set; }
        public string ImagemURL { get; set; }
        public string Telefone { get; set; }
        public string Email { get; set; }
        public List<RedeSocialDto> RedesSociais { get; set; }
        public List<EventoDto> Eventos { get; set; }
    }
}
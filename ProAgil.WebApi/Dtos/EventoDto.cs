using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ProAgil.WebApi.Dtos
{
    public class EventoDto
    {
        public int Id { get; set; }

        [Required (ErrorMessage="O Local é Requirido Para Criar o Evento")]
        public string Local { get; set; }
        public string DataEvento { get; set; }

        [Required (ErrorMessage="O Tema é Requirido Para Criar o Evento")]
        public string Tema { get; set; }
        public int QtdPessoas { get; set; }
        public string ImagemURL { get; set; }

        [Phone (ErrorMessage="Insira um Telefone Válido")]
        public string Telefone { get; set; }

        [EmailAddress (ErrorMessage="Insira um E-mail Válido")]
        public string Email { get; set; }
        public List<LoteDto> Lotes { get; set; }
        public List<RedeSocialDto> RedesSociais { get; set; }
        public List<PalestranteDto> Palestrantes { get; set; }
    }
}
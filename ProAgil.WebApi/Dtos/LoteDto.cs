using System.ComponentModel.DataAnnotations;

namespace ProAgil.WebApi.Dtos
{
    public class LoteDto
    {
        public int Id { get; set; }

        [Required (ErrorMessage="O Nome do Lote é Obrigatório")]
        public string Nome { get; set; }

        [Required (ErrorMessage="O Preço é Obrigatório")]
        public decimal Preco { get; set; }
        public string DataInicio { get; set; }
        public string DataFim { get; set; }

        [Required (ErrorMessage="A Quantidade é Obrigatório")]
        public int Quantidade { get; set; }
    }
}
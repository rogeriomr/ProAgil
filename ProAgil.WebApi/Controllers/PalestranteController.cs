using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProAgil.Domain;
using ProAgil.Repository;

namespace ProAgil.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PalestranteController : ControllerBase
    {
        private readonly IProAgilRepository _repo;

        public PalestranteController(IProAgilRepository repo)
        {
            _repo = repo;
        }

         // GET
        [HttpGet]
        public async Task<ActionResult> Get()
        {
            try
            {
                var results = await _repo.GetAllPalestrantesAsync(true);
                return Ok(results);
            }
            catch (System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de Dados Falhou");
            }
            
        }

        // GET
        [HttpGet("{PalestranteId}")]
        public async Task<ActionResult> Get(int PalestranteId)
        {
            try
            {
                var results = await _repo.GetPalestranteAsyncById(PalestranteId, true);
                return Ok(results);
            }
            catch (System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de Dados Falhou");
            }
            
        }

        // GET
        [HttpGet("getByNome/{nome}")]
        public async Task<ActionResult> Get(string nome)
        {
            try
            {
                var results = await _repo.GetAllPalestrantesAsyncByNome(nome, true);
                return Ok(results);
            }
            catch (System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de Dados Falhou");
            }
            
        }

        // POST
        [HttpPost]
        public async Task<ActionResult> Post(Palestrante model)
        {
            try
            {
                _repo.Add(model);

                if(await _repo.SaveChangesAsync()) {
                    return Created($"/api/palestrante/{model.Id}", model);
                }

            }
            catch (System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de Dados Falhou");
            }

            return BadRequest();
            
        }

        // PUT
        [HttpPut]
        public async Task<ActionResult> Put(int PalestranteId, Evento model)
        {
            try
            {
                var palestrante = await _repo.GetPalestranteAsyncById(PalestranteId, false);

                if(palestrante == null) return NotFound();

                _repo.Update(model);

                if(await _repo.SaveChangesAsync()) {
                    return Created($"/api/palestrante/{model.Id}", model);
                }

            }
            catch (System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de Dados Falhou");
            }

            return BadRequest();
            
        }

        // DELETE
        [HttpDelete]
        public async Task<ActionResult> Delete(int PalestranteId)
        {
            try
            {
                var palestrante = await _repo.GetPalestranteAsyncById(PalestranteId, false);

                if(palestrante == null) return NotFound();

                _repo.Delete(palestrante);

                if(await _repo.SaveChangesAsync()) {
                    return Ok();
                }

            }
            catch (System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de Dados Falhou");
            }

            return BadRequest();
            
        }
    }
}
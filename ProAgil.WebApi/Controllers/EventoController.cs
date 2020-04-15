using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProAgil.Domain;
using ProAgil.Repository;

namespace ProAgil.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventoController : ControllerBase
    {
        private readonly IProAgilRepository _repo;

        public EventoController(IProAgilRepository repo)
        {
            _repo = repo;
        }

        // GET
        [HttpGet]
        public async Task<ActionResult> Get()
        {
            try
            {
                var results = await _repo.GetAllEventosAsync(true);
                return Ok(results);
            }
            catch (System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de Dados Falhou");
            }
            
        }

        // GET
        [HttpGet("{EventoId}")]
        public async Task<ActionResult> Get(int EventoId)
        {
            try
            {
                var results = await _repo.GetEventoAsyncById(EventoId, true);
                return Ok(results);
            }
            catch (System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de Dados Falhou");
            }
            
        }

        // GET
        [HttpGet("getByTema/{tema}")]
        public async Task<ActionResult> Get(string tema)
        {
            try
            {
                var results = await _repo.GetAllEventosAsyncByTema(tema, true);
                return Ok(results);
            }
            catch (System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de Dados Falhou");
            }
            
        }

        // POST
        [HttpPost]
        public async Task<ActionResult> Post(Evento model)
        {
            try
            {
                _repo.Add(model);

                if(await _repo.SaveChangesAsync()) {
                    return Created($"/api/evento/{model.Id}", model);
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
        public async Task<ActionResult> Put(int EventoId, Evento model)
        {
            try
            {
                var evento = await _repo.GetEventoAsyncById(EventoId, false);

                if(evento == null) return NotFound();

                _repo.Update(model);

                if(await _repo.SaveChangesAsync()) {
                    return Created($"/api/evento/{model.Id}", model);
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
        public async Task<ActionResult> Delete(int EventoId)
        {
            try
            {
                var evento = await _repo.GetEventoAsyncById(EventoId, false);

                if(evento == null) return NotFound();

                _repo.Delete(evento);

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
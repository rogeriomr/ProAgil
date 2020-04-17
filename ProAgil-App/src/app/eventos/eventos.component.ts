import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { EventoService } from '../_services/evento/evento.service';
import { Evento } from '../_models/Evento';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ptBrLocale } from 'ngx-bootstrap/locale';
import { ToastrService } from 'ngx-toastr';
defineLocale('pt-br', ptBrLocale);

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {

  bodyDeletarEvento = '';
  title = 'Eventos';
  evento: Evento;
  eventos: Evento[];
  eventosFiltradros: Evento[];
  imagemLargura = 50;
  imagemMargem = 2;
  modalRef: BsModalRef;
  mostrarImagem = false;
  registerForm: FormGroup;
  salvarEvento: string;

  constructor(
    private eventoService: EventoService,
    private fb: FormBuilder,
    private localeSerbice: BsLocaleService,
    private modalService: BsModalService,
    private toastr: ToastrService) {
      this.localeSerbice.use('pt-br');
  }

  _filtroLista: string;
  get filtroLista(): string {
    return this._filtroLista;
  }
  set filtroLista(value: string) {
    this._filtroLista = value;
    this.eventosFiltradros = this.filtroLista ? this.filtrarEventos(this.filtroLista) : this.eventos;
  }

  ngOnInit() {
    this.validation();
    this.getEventos();
  }

  getEventos() {
    this.eventoService.getAllEventos().subscribe((_eventos: Evento[]) => {
      this.eventos = _eventos;
      this.eventosFiltradros = _eventos;
    }, error => {
      this.toastr.error(`Erro ao Tentar Carregar Eventos: ${error}`);
    });
  }

  salvarAlteracoes(template: any) {
    if (this.registerForm.valid) {
      if (this.salvarEvento === 'post') {
        this.evento = Object.assign({}, this.registerForm.value);
        this.eventoService.postEvento(this.evento).subscribe(
          (novoEvento: Evento) => {
            template.hide();
            this.getEventos();
            this.toastr.success('Inserido Com Sucesso!');
          }, error => {
            this.toastr.error(`Erro ao Inserir: ${error}`);
          });
        } else {
          this.evento = Object.assign({id: this.evento.id}, this.registerForm.value);
          this.eventoService.putEvento(this.evento).subscribe(() => {
            template.hide();
            this.getEventos();
            this.toastr.success('Atualizado Com Sucesso!');
          }, error => {
            this.toastr.error(`Erro ao Atualizar: ${error}`);
          });
        }
    }
  }

  editarEvento(template: any, e: Evento) {
    this.openModal(template);
    this.evento = e;
    this.registerForm.patchValue(this.evento);
    this.salvarEvento = 'put';
  }

  excluirEvento(evento: Evento, template: any) {
    template.show();
    this.evento = evento;
    this.bodyDeletarEvento = `Tem certeza que deseja excluir o Evento: ${evento.tema}, Código: ${evento.id}`;
  }

  confirmeDelete(template: any) {
    this.eventoService.delEvento(this.evento.id).subscribe(
      () => {
        template.hide();
         this.getEventos();
        this.toastr.success('Deletado Com Sucesso!');
      }, error => {
        this.toastr.success('Erro ao Tentar Deletar!');
      }
    );
  }

  filtrarEventos(filtrarPor: string): Evento[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.eventos.filter(evento => evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1);
  }

  alternarImage() {
    this.mostrarImagem = !this.mostrarImagem;
  }

  validation() {
    this.registerForm = this.fb.group({
      tema: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      local: ['', Validators.required],
      dataEvento: ['', Validators.required],
      imagemURL: ['', Validators.required],
      qtdPessoas: ['', [Validators.required, Validators.max(1000)]],
      telefone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  openModal(template: any) {
    this.registerForm.reset();
    template.show();
    this.salvarEvento = 'post';
  }

}

import { ActivatedRoute } from '@angular/router';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Component, OnInit } from '@angular/core';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { EventoService } from 'src/app/_services/evento/evento.service';
import { Evento } from '../../_models/Evento';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ptBrLocale } from 'ngx-bootstrap/locale';
import { ToastrService } from 'ngx-toastr';
defineLocale('pt-br', ptBrLocale);

@Component({
  selector: 'app-evento-edit',
  templateUrl: './eventoEdit.component.html',
  styleUrls: ['./eventoEdit.component.css']
})
export class EventoEditComponent implements OnInit {

  dataAtual: string;
  evento: Evento = new Evento();
  file: File;
  fileNameToUpload: string;
  imagemURL = 'assets/Images/uploadImage.jpg';
  modalRef: BsModalRef;
  registerForm: FormGroup;
  title = 'Editar Evento';

  constructor(
    private eventoService: EventoService,
    private fb: FormBuilder,
    private localeSerbice: BsLocaleService,
    private modalService: BsModalService,
    private router: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.localeSerbice.use('pt-br');
  }

  ngOnInit() {
    this.validation();
    this.loadEvento();
  }

  addLote() {
    this.lotes.push(this.createLote({ id: 0 }));
  }

  addRedeSocial() {
    this.redesSociais.push(this.createRedeSocial({ id: 0 }));
  }

  createLote(lote: any): FormGroup {
    return this.fb.group({
      id: [lote.id],
      nome: [lote.nome, Validators.required],
      quantidade: [lote.quantidade, Validators.required],
      preco: [lote.preco, Validators.required],
      dataInicio: [lote.dataInicio],
      dataFim: [lote.dataFim],
    });
  }

  createRedeSocial(redeSocial: any): FormGroup {
    return this.fb.group({
      id: [redeSocial.id],
      nome: [redeSocial.nome, Validators.required],
      url: [redeSocial.url, Validators.required],
    });
  }

  get lotes(): FormArray {
    return this.registerForm.get('lotes') as FormArray;
  }

  get redesSociais(): FormArray {
    return this.registerForm.get('redesSociais') as FormArray;
  }

  loadEvento() {
    const idEvento = +this.router.snapshot.paramMap.get('id');
    this.eventoService.getEventoById(idEvento).subscribe((evento: Evento) => {
      this.evento = Object.assign({}, evento);
      evento.dataEvento = new Date(evento.dataEvento);
      this.fileNameToUpload = this.evento.imagemURL.toString();

      this.imagemURL = `http://localhost:5000/resources/images/${this.evento.imagemURL}?_ts=${this.dataAtual}`;

      this.evento.imagemURL = '';
      this.registerForm.patchValue(this.evento);

      this.evento.lotes.forEach(lote => {
        this.lotes.push(this.createLote(lote));
      });

      this.evento.redesSociais.forEach(redeSocial => {
        this.redesSociais.push(this.createRedeSocial(redeSocial));
      });
    });
  }


  onFileChange(file: File) {
    const reader = new FileReader();
    reader.onload = (event: any) => this.imagemURL = event.target.result;

    this.file = file;

    reader.readAsDataURL(file[0]);
  }

  removeLote(id: number) {
    this.lotes.removeAt(id);
  }

  removeRedeSocial(id: number) {
    this.redesSociais.removeAt(id);
  }

  saveEvento() {
    this.evento = Object.assign({id: this.evento.id}, this.registerForm.value);
    this.evento.imagemURL = this.fileNameToUpload;

    this.uploadImagem();

    this.eventoService.putEvento(this.evento).subscribe(() => {
      this.toastr.success('Atualizado Com Sucesso!');
    }, error => {
      this.toastr.error(`Erro ao Atualizar: ${error}`);
    });
  }

  uploadImagem() {
    if (this.registerForm.get('imagemURL').value !== '') {
    console.log(this.file);
    this.eventoService.postImagem(this.file, this.fileNameToUpload).subscribe(
      () => {
        this.dataAtual = new Date().getMilliseconds().toString();
        this.imagemURL = `http://localhost:5000/resources/images/${this.evento.imagemURL}?_ts=${this.dataAtual}`;
      });
    }
  }

  validation() {
    this.registerForm = this.fb.group({
      id: [],
      tema: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      local: ['', Validators.required],
      dataEvento: ['', Validators.required],
      imagemURL: [''],
      qtdPessoas: ['', [Validators.required, Validators.max(1000)]],
      telefone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      lotes: this.fb.array([]),
      redesSociais: this.fb.array([])
    });
  }
}

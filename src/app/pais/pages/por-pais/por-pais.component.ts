import { Component} from '@angular/core';
import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [`
    li{
      cursor: pointer;
    }
  `
  ]
})
export class PorPaisComponent{

  termino: string = "";
  hayError: Boolean = false;
  paises: Country[] = [];
  paisesSugeridos: Country[] = [];
  mostrarSugerencias: boolean = false;

  constructor(private PaisService: PaisService) { }
  buscar(termino:string) {
    this.hayError = false;
    this.termino = termino;
    this.PaisService.buscarPais(this.termino)
      .subscribe(paises => {
        this.paises = paises;
      },
      (err) => {
        console.log('Error')
        this.hayError = true;
        this.paises = [];
      });
  }
  sugeriencias(termino: string) {
    this.mostrarSugerencias = true;
    this.hayError = false;
    this.termino = termino;
    this.PaisService.buscarPais(termino)
      .subscribe(paises => this.paisesSugeridos = paises.splice(0, 5)//solo muestra los 5 primeros
      , (err) => this.paisesSugeridos = [])
  }
  buscarSugerido(termino:string) {
    this.buscar(termino);
  }
}

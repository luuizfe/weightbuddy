import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Aplicativo } from './app';

describe('Aplicativo', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Aplicativo],
      providers: [provideRouter([])],
    })
      .compileComponents();
  });

  it('deve criar o aplicativo', () => {
    const fixture = TestBed.createComponent(Aplicativo);
    const aplicativo = fixture.componentInstance;
    expect(aplicativo).toBeTruthy();
  });

  it('deve renderizar a marca', async () => {
    const fixture = TestBed.createComponent(Aplicativo);
    await fixture.whenStable();
    const compilado = fixture.nativeElement as HTMLElement;
    expect(compilado.querySelector('.marca')?.textContent).toContain('WeightBuddy');
  });
});

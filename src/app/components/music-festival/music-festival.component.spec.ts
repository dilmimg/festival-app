import { async, ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule} from '@angular/common/http/testing';
import { MusicFestivalComponent } from './music-festival.component';
import { MusicFestivalService } from 'src/app/services/music-festival.service';
import { Observable, Observer } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('MusicFestivalComponent', () => {
  let component: MusicFestivalComponent;
  let fixture: ComponentFixture<MusicFestivalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ MusicFestivalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicFestivalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title in a h1 tag', () => {
    fixture = TestBed.createComponent(MusicFestivalComponent);
    fixture.detectChanges();
    const element = fixture.debugElement.nativeElement;
    expect(element.querySelector('h1').textContent).toContain('Music Festivals by Record Label and Band');
  });

  it('should render music festival data', fakeAsync(() => {
    const asyncDataService = fixture.debugElement.injector.get(MusicFestivalService);
    const mockFestival = [{
      'name': 'LOL-palooza',
      'bands': [{
          'name': 'Winter Primates',
          'recordLabel': 'XS Recordings'
      }]}];

    spyOn(asyncDataService, 'getMusicFestivals').and.returnValue(
      Observable.create((observer: Observer<{ name: string, bands: {name: string, recordLabel: string}[]}[]>) => {
        observer.next(mockFestival);
        return observer;
      })
    );

    tick();

    component.ngOnInit();
    fixture.detectChanges();
    expect(component.recordLabels.length).toEqual(1);

    const element = fixture.debugElement.query(By.css('.text-primary.pt-4')).nativeElement;
    expect(element.textContent).toEqual('XS Recordings');
  }));
});

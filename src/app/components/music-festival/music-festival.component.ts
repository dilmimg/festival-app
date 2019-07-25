import { Component, OnInit } from '@angular/core';
import { MusicFestivalService } from 'src/app/services/music-festival.service';
import { MusicFestival } from 'src/app/models/music.festival';
import { sortBy } from 'lodash';

@Component({
  selector: 'app-music-festival',
  templateUrl: './music-festival.component.html'
})
export class MusicFestivalComponent implements OnInit {

  recordLabels: any[];
  isError = false;

  constructor(private musicFestivalService: MusicFestivalService) { }

  ngOnInit() {
    this.getFestivals();
  }

  getFestivals() {
    this.musicFestivalService.getMusicFestivals().subscribe(festivals => {
      if (!festivals || festivals.length === 0) {
        this.isError = true;
        return;
      }
      this.arrangeMusicFestivals(festivals);
    }, error => {
      this.isError = true;
    });
  }

  arrangeMusicFestivals(festivals: MusicFestival[]) {
    let recordLabelArr = new Array<any>();
    recordLabelArr = festivals.map(f => {
      return f.bands.map(b => ({rlabel: (b.recordLabel ? b.recordLabel : 'Unknown'), band: b.name, festival: f.name }));
    }).reduce((f1, f2) => {
      return f1.concat(f2);
    });

   this.recordLabels = sortBy(recordLabelArr, ['rlabel', 'band', 'festival']);
  }
}

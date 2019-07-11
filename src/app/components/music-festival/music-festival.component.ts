import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { MusicFestival } from 'src/app/models/music.festival';
import { sortBy } from 'lodash';

@Component({
  selector: 'app-music-festival',
  templateUrl: './music-festival.component.html'
})
export class MusicFestivalComponent implements OnInit {

  recordLabels: any[];
  isError = false;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.getFestivals();
  }

  getFestivals() {
    this.dataService.getMusicFestivals().subscribe(festivals => {
      if (!festivals || festivals.length === 0) {
        this.isError = true;
        return;
      }
      this.arrangeData(festivals);
    }, error => {
      this.isError = true;
    });
  }

  arrangeData(festivals: MusicFestival[]) {
    const recordLabelArr = new Array<any>();
    festivals.forEach(f => {
      const recordArr = f.bands.map(b => ({rlabel: (b.recordLabel ? b.recordLabel : 'Unknown'), band: b.name, festival: f.name }));
      recordLabelArr.push(...recordArr);
    });

   this.recordLabels = sortBy(recordLabelArr, ['rlabel', 'band', 'festival']);
  }
}

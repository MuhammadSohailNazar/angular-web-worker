import { Component, OnInit } from '@angular/core';
import { InlineWorker } from './InlineWork.class';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  result = 0;
  isCalculating: boolean = false;
  startTime: Date = new Date();
  endTime: Date = new Date();
  startWorkerTime: Date = new Date();
  endWorkerTime: Date = new Date();
  count: number = 0;
  showImage: boolean = true;
  ngOnInit() {

    const worker = new InlineWorker(() => {
      // START OF WORKER THREAD CODE
      console.log('Start worker thread, wait for postMessage: ');

      const calculateCountOfPrimeNumbers = (limit: number) => {

        const isPrime = (num: number) => {
          for (let i = 2; i < num; i++) {
            if (num % i === 0) { return false; }
          }
          return num > 1;
        };

        let countPrimeNumbers = 0;

        while (limit >= 0) {
          if (isPrime(limit)) { countPrimeNumbers += 1; }
          limit--;
        }

        // this is from DedicatedWorkerGlobalScope ( because of that we have postMessage and onmessage methods )
        // and it can't see methods of this class
        // @ts-ignore
        this.postMessage({
          primeNumbers: countPrimeNumbers
        });
      };

      // @ts-ignore
      this.onmessage = (evt) => {
        console.log('Calculation started: ' + new Date());
        calculateCountOfPrimeNumbers(evt.data.limit);
      };
      // END OF WORKER THREAD CODE
    });
    this.startWorkerTime = new Date();
    worker.postMessage({ limit: 300000 });

    worker.onmessage().subscribe((data) => {
      this.isCalculating = true;
      console.log('Calculation done: ', new Date() + ' ' + data.data);
      this.result = data.data.primeNumbers;
      this.endWorkerTime = new Date();
      worker.terminate();
    });

    worker.onerror().subscribe((data) => {
      console.log(data);
    });
  }

  onClick() {
    this.count++;
  }

  hideImage() {
    this.showImage = !this.showImage;
  }

  calculateCountOfPrimeNumbers(limit: number) {
    this.startTime = new Date();
    this.isCalculating = false;
    const isPrime = (num: number) => {
      for (let i = 2; i < num; i++) {
        if (num % i === 0) { return false; }
      }
      return num > 1;
    };

    let countPrimeNumbers = 0;

    while (limit >= 0) {
      if (isPrime(limit)) { countPrimeNumbers += 1; }
      limit--;
    }
    this.endTime = new Date();
    this.isCalculating = true;
  }
}

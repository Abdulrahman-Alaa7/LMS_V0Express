interface MonthBoxQuery {
  flag: any;
  tops: any;
  heights: any;
}

class MonthBoxQuery {
  constructor(flag: any) {
    this.flag = flag;
    this.tops = [20, 20];
    this.heights = [18, 18];
    // this.tops = [16, 20];
    // this.heights = [14, 18];
  }

  updateFlag() {
    this.flag = window.innerWidth <= 530 || window.innerHeight <= 470;
  }

  getFlag() {
    return this.flag;
  }

  getTop() {
    const [a, b] = this.tops;
    return this.flag ? a : b;
  }

  getHeight() {
    const [a, b] = this.heights;
    return this.flag ? a : b;
  }

  getPrevTop(top: any) {
    const [a, b] = this.tops;
    return top === a ? b : a;
  }
}

export default MonthBoxQuery;

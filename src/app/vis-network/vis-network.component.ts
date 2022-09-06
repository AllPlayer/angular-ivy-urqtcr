import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { DataSet } from 'vis-data';
import { Network } from 'vis-network';

@Component({
  selector: 'app-vis-network',
  templateUrl: './vis-network.component.html',
  styleUrls: ['./vis-network.component.css'],
})
export class VisNetworkComponent implements OnInit, AfterViewInit {
  @ViewChild('network') el: ElementRef;
  private networkInstance: any;
  constructor() {}
  nodes: any = [];
  edges: any = [];
  ngOnInit() {}
  ngAfterViewInit() {
    this.generate();
  }
  generate() {
    const container = this.el.nativeElement;
    this.nodes = new DataSet<any>([
      { id: 1, label: 'Node 1' },
      { id: 2, label: 'Node 2' },
      { id: 3, label: 'Node 3' },
      { id: 4, label: 'Node 4' },
      { id: 5, label: 'Node 5' },
    ]);

    this.edges = new DataSet<any>([
      { id: 1, from: 1, to: 3 },
      { id: 2, from: 1, to: 2 },
      { id: 3, from: 2, to: 4 },
      { id: 4, from: 2, to: 5 },
    ]);
    const data = { nodes: this.nodes, edges: this.edges };

    this.networkInstance = new Network(container, data, {});
  }
  add() {
    this.nodes.add({ id: this.nodes.get().length+1, label: 'test' });
    this.edges.add({
      id: this.edges.get().length+1,
      from: 1,
      to: this.nodes.get().length,
    });
  }
  toRemoveEdges: any = [];
  toRemoveNodes: any = [];
  removeEdges(id: number){
    for (let i = 0; i < this.edges.get().length; i++) {
      let element = this.edges.get()[i];
      if (element.from == id) {
        this.removeCalc(element.from);
      }
      if (element.to == id) {
        this.toRemoveEdges.push(element.id);
      }
    }
  }
  removeNodes(id: number){
    for (let i = 0; i < this.nodes.get().length; i++) {
      let element = this.nodes.get()[i];
      if (element.id == id) {
        this.toRemoveNodes.push(element.id);
      }
    }
  }
  removeCalc(id){
    this.removeEdges(id);
    this.removeNodes(id);
  }
  remove(id: number) {
    this.removeCalc(id);
    console.log(this.toRemoveEdges)
    // for(let i = 0; i < this.removeEdges.length; i++){
    //   let element = this.removeEdges[i]
    //   this.edges.remove([element])
    // }
    // for(let i = 0; i < this.removeNodes.length; i++){
    //   let element = this.removeNodes[i]
    //   this.nodes.remove([element])
    // }
    console.log(this.nodes.get());
    console.log(this.edges.get());
  }
}

import { Component, ElementRef, HostListener, Renderer2, ViewChild } from '@angular/core';
import { fabric } from 'fabric';
import html2canvas from 'html2canvas';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface FontFamily {
  name: string;
  fonts: string[];
}

@Component({
  selector: 'jhi-designer-tool',
  templateUrl: './designer-tool.component.html',
  styleUrls: ['./bootstrap.min.css', './bootstrap-responsive.min.css', './jquery.miniColors.css', './designer-tool.component.scss'],
})
export class DesignerToolComponent {
  @ViewChild('tshirttype', { static: true }) tshirtType!: ElementRef;
  // @ViewChild('tcanvas', {static: true}) canvasElement!: ElementRef;
  @ViewChild('shirtDiv', { static: true }) shirtDivElement!: ElementRef;
  @ViewChild('overlayCanvasElement', { static: true }) overlayCanvasElement!: ElementRef;

  colorOptions: string[] = [
    '#ffffff',
    '#616161',
    '#f0f0f0',
    '#5b5b5b',
    '#222222',
    '#fc8d74',
    '#432d26',
    '#eead91',
    '#806355',
    '#382d21',
    '#faef93',
    '#aeba5e',
    '#8aa140',
    '#1f6522',
    '#13afa2',
    '#b8d5d7',
    '#15aeda',
    '#a5def8',
    '#0f77c0',
    '#3469b7',
    '#c50404',
  ];
  textToAdd: string = '';
  selectedObject: Object | any;
  selectedColor: string = '#ffffff';
  tshirtTypes = [
    { value: './content/images/crew_front.png', label: 'Crew' },
    {
      value: './content/images/longsleev.png',
      label: ' Long Sleeve',
    },
    { value: './content/images/tank.png', label: ' Tank ' },
    {
      value: './content/images/hoodie.png',
      label: 'Hoodie',
    },
    { value: './content/images/women_crew.png', label: 'womens crew front' },
  ];
  canvas!: fabric.Canvas;
  selectedCustomImage: string = './content/images/crew_front.png';
  selectedCustomText: fabric.Text;

  selectedFontFamily: string = 'Arial';

  fontFamilies: FontFamily[] = [
    {
      name: 'Sans-serif',
      fonts: ['Arial', 'Helvetica', 'Verdana', 'Tahoma', 'Geneva'],
    },
    { name: 'Serif', fonts: ['Times New Roman', 'Georgia', 'Palatino', 'Book Antiqua', 'Garamond'] },
    {
      name: 'Monospace',
      fonts: ['Courier New', 'Lucida Console', 'Monaco', 'Consolas', 'Andale Mono'],
    }, // Add more font families and their fonts as needed
  ];
  selectedFile!: File;

  constructor(
    private renderer: Renderer2,
    private http: HttpClient,
  ) {
    this.selectedCustomText = new fabric.Text('Default Text', {
      left: 10,
      top: 10,
      fontSize: 20, // Other properties...
    });
  }
  onFontChange(event: any) {
    this.selectedFontFamily = event.target.value;
    const activeObject = this.canvas.getActiveObject();
    if (activeObject && activeObject.type === 'i-text') {
      (activeObject as any).set('fontFamily', this.selectedFontFamily);
      this.canvas.renderAll();
    }
  }
  overlayCanvas!: fabric.Canvas; // Declare overlayCanvas property

  ngAfterViewInit() {
    // Canvas initialization and event listeners
    if (this.overlayCanvasElement) {
      // Initialize overlay canvas
      this.overlayCanvas = this.canvas;

      // Add event listeners for canvas interactions
      this.overlayCanvas.on('mouse:over', event => {
        // Handle mouse over overlay canvas event
        if (event.target) {
          this.overlayCanvas.hoverCursor = 'pointer';
          this.overlayCanvas.setActiveObject(event.target);
        } else {
          this.overlayCanvas.hoverCursor = 'default';
          this.overlayCanvas.discardActiveObject();
        }
      });
    }
    this.initTshirtTypeChange();
    this.initializeChangeHandler();

    // Initialize main canvas
    this.canvas = new fabric.Canvas('tshirtFacingFront', {
      // Add any additional options if needed
    });

    // Initialize overlay canvas
    this.overlayCanvas = this.canvas;

    // Add event listeners for canvas interactions
    this.canvas.on('object:selected', event => {
      this.selectedObject = event.target;
    });

    // Other canvas event listeners...

    this.overlayCanvas.on('mouse:over', event => {
      // Handle mouse over overlay canvas event
      if (event.target) {
        this.overlayCanvas.hoverCursor = 'pointer';
        this.overlayCanvas.setActiveObject(event.target);
      } else {
        this.overlayCanvas.hoverCursor = 'default';
        this.overlayCanvas.discardActiveObject();
      }
    });

    // Log to check if overlayCanvas is initialized
    console.log('Overlay Canvas Initialized:', this.overlayCanvas);
  }
  loadCustomImage(event: any) {
    const selectedOption = this.tshirtTypes.find(option => option.value === event.target.value);
    if (selectedOption) {
      this.selectedCustomImage = selectedOption.value;
    }
  }

  saveDivAsImage(): void {
    // Use html2canvas to capture the content of the shirtDiv
    html2canvas(this.shirtDivElement.nativeElement).then(canvas => {
      // Convert the canvas to a data URL
      const dataURL = canvas.toDataURL('image/png');

      // Create a link element to trigger download
      const downloadLink = document.createElement('a');
      downloadLink.href = dataURL;
      downloadLink.download = 'custom_tshirt_design.png';

      // Trigger a click event on the link to start the download
      const event = new MouseEvent('click');
      downloadLink.dispatchEvent(event);
    });
  }

  applyBackgroundColor() {
    const tshirtFacing = document.getElementById('tshirtFacingFront');

    if (tshirtFacing) {
      tshirtFacing.style.backgroundColor = this.selectedColor;
    }
  }

  selectColor(color: string) {
    this.selectedColor = color;
    this.applyBackgroundColor();
  }
  onFileChange(event: any): void {
    const file: File = event.target.files[0];

    if (file) {
      this.uploadFile(file).subscribe(
        response => {
          console.log('File uploaded successfully:', response);
        },
        error => {
          console.error('Error uploading file:', error);
        },
      );
    }
  }
  uploadFile(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);

    const fileName = 'file' + Date.now().toString();

    return this.http.put(`/api/products/upload/${encodeURIComponent(fileName)}`, formData);
  }
  private initializeChangeHandler(): void {
    const tshirtType = document.getElementById('tshirttype') as HTMLSelectElement;

    if (tshirtType) {
      tshirtType.addEventListener('change', () => {
        this.selectedCustomImage = './content/images/' + tshirtType.value;
        // this.selectedCustomImageBack = this.getBackImageName(this.selectedCustomImage);
      });
    }
  }
  addTextToCanvas() {
    if (this.textToAdd && this.overlayCanvas) {
      console.log('Adding text to canvas...');

      const text = new fabric.IText(this.textToAdd, {
        left: 50,
        top: 50,
        fontFamily: this.selectedFontFamily,
        fontSize: 20,
        fill: this.selectedColor,
      });

      console.log('Text object created:', text);

      this.overlayCanvas.add(text);
      this.overlayCanvas.renderAll();

      console.log('Text added to overlay canvas:', text);

      this.textToAdd = '';
    }
  }

  private initTshirtTypeChange() {
    const tshirtType = this.tshirtType.nativeElement;
    this.renderer.listen(tshirtType, 'change', event => {
      this.loadCustomImage(event);
    });
  }
}

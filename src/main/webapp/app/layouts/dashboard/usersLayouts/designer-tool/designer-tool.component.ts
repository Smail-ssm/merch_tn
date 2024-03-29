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
  // ViewChild declarations
  @ViewChild('tshirttype', { static: true }) tshirtType!: ElementRef;
  @ViewChild('tcanvas', { static: true }) canvasElement!: ElementRef;
  @ViewChild('canvasContainer', { static: true }) canvasContainer!: ElementRef;
  @ViewChild('shirtDiv', { static: true }) shirtDivElement!: ElementRef;

  // Other class properties
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
  canvasHovered: boolean | undefined;
  selectedCustomText: fabric.Text;

  // Default font family and list
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
  // Method to initialize tshirt type change
  selectedFile!: File;

  // Constructor
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

    // Apply the font family to the selected text on the canvas
    const activeObject = this.canvas.getActiveObject();

    if (activeObject && activeObject.type === 'i-text') {
      (activeObject as any).set('fontFamily', this.selectedFontFamily);
      this.canvas.renderAll();
    }
    console.log('Selected Font: ', this.selectedFontFamily);
  }

  // ngAfterViewInit lifecycle hook
  ngAfterViewInit() {
    // Canvas initialization and event listeners
    this.canvas = new fabric.Canvas(this.canvasElement.nativeElement);
    this.createCanvas();
    this.initTshirtTypeChange();
    this.initializeChangeHandler();
    this.setCanvasSize();

    // Add event listeners for canvas interactions
    this.canvas.on('object:selected', event => {
      this.selectedObject = event.target;
    });

    // Other canvas event listeners...

    this.canvas.on('mouse:over', event => {
      // Handle mouse over canvas event
      if (event.target) {
        this.canvas.hoverCursor = 'pointer';
        this.canvas.setActiveObject(event.target);
      } else {
        this.canvas.hoverCursor = 'default';
        this.canvas.discardActiveObject();
      }
    });
  }

  // Method to set canvas size based on container size
  setCanvasSize() {
    // Set canvas size based on container size
    const container = this.canvasContainer.nativeElement;
    const canvas = this.canvasElement.nativeElement;

    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;
  }

  // HostListener for window resize
  @HostListener('window:resize', ['$event']) onResize(event: Event) {
    this.setCanvasSize();
  }

  // Method to load custom image based on user selection
  loadCustomImage(event: any) {
    const selectedOption = this.tshirtTypes.find(option => option.value === event.target.value);

    if (selectedOption) {
      this.selectedCustomImage = selectedOption.value;
      // this.selectedCustomImageBack = this.getBackImageName(this.selectedCustomImage);
    }
  }

  // Method to add text to the canvas
  addTextToCanvas() {
    if (this.textToAdd) {
      const text = new fabric.IText(this.textToAdd, {
        left: 50,
        top: 50,
        fontFamily: 'Arial',
        fontSize: 20,
        fill: 'black',
      });

      this.canvas.add(text);
      this.canvas.renderAll();
      this.textToAdd = '';
    }
  }

  changeFontFamily(fontFamily: string): void {
    // Handle font family change logic
  }

  // Method to delete selected object from canvas
  deleteSelectedObject() {
    if (this.selectedObject) {
      this.canvas.remove(this.selectedObject);
      this.canvas.renderAll();
    }
  }

  // Method to save the canvas content as an image
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

  // Method to apply background color to the canvas
  applyBackgroundColor() {
    const tshirtFacing = document.getElementById('tshirtFacingFront');
    // const tshirtFacingBack = document.getElementById('tshirtFacingBack');

    if (tshirtFacing) {
      tshirtFacing.style.backgroundColor = this.selectedColor;
    }
  }

  // Method to select a color
  selectColor(color: string) {
    this.selectedColor = color;
    this.applyBackgroundColor();
  }

  // Method to change text value on the canvas
  changeTextValue(event: Event): void {
    const newTextValue = (event.target as HTMLInputElement).value;

    // Assuming this.selectedCustomText is the fabric.js text object
    this.selectedCustomText.set('text', newTextValue);

    // Render canvas after text change
    this.canvas.renderAll();
  }

  // Method to toggle bold style
  toggleBold(): void {
    if (this.selectedCustomText) {
      // Update the Fabric.js text object with desired styles
      this.selectedCustomText.set({
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 10,
        fontFamily: 'Courier',
      });

      // Render canvas after style change
      this.canvas.renderAll();
    }
  }

  // Method to toggle italic style
  toggleItalic(): void {
    if (this.selectedCustomText) {
      // Toggle italic style for the selected text
      const fontStyle = this.selectedCustomText.fontStyle === 'italic' ? '' : 'italic';
      this.selectedCustomText.set('fontStyle', fontStyle);

      // Render canvas after style change
      this.canvas.renderAll();
    }
  }

  // Method to toggle strike-through
  toggleStrike(): void {
    if (this.selectedCustomText) {
      // Toggle strike-through for the selected text
      // @ts-ignore
      const currentTextDecoration = (this.selectedCustomText.get('textDecoration') as string) || '';
      const newDecoration = currentTextDecoration.includes('line-through')
        ? currentTextDecoration.replace('line-through', '')
        : `${currentTextDecoration} line-through`;

      // Use set with a generic object to avoid TypeScript error
      this.selectedCustomText.set({
        textDecoration: newDecoration,
      } as Partial<Text>);

      // Render canvas after style change
      this.canvas.renderAll();
    }
  }

  // Method to toggle bold style

  // Method to toggle underline
  toggleUnderline(): void {
    if (this.selectedCustomText) {
      // Toggle underline for the selected text
      // @ts-ignore
      const currentTextDecoration = (this.selectedCustomText.get('textDecoration') as string) || '';
      const newDecoration = currentTextDecoration.includes('underline')
        ? currentTextDecoration.replace('underline', '')
        : `${currentTextDecoration} underline`;

      // Use set with a generic object to avoid TypeScript error
      this.selectedCustomText.set({
        textDecoration: newDecoration,
      } as Partial<Text>);

      // Render canvas after style change
      this.canvas.renderAll();
    }
  }

  // Method to handle font color change
  changeFontColor(event: Event): void {
    if (this.selectedCustomText) {
      const newFontColor = (event.target as HTMLInputElement).value;

      // Assuming this.selectedCustomText is the fabric.js text object
      this.selectedCustomText.set('fill', newFontColor);

      // Render canvas after color change
      this.canvas.renderAll();
    }
  }

  // Method to handle stroke color change
  changeStrokeColor(event: Event): void {
    if (this.selectedCustomText) {
      const newStrokeColor = (event.target as HTMLInputElement).value;

      // Assuming this.selectedCustomText is the fabric.js text object
      this.selectedCustomText.set('stroke', newStrokeColor);

      // Render canvas after color change
      this.canvas.renderAll();
    }
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

  // Method to create canvas element dynamically
  private createCanvas() {
    const canvasElement = this.renderer.createElement('canvas');
    this.renderer.setAttribute(canvasElement, 'id', 'tcanvas');
    this.renderer.appendChild(this.tshirtType.nativeElement.parentNode, canvasElement);
    this.canvas = new fabric.Canvas(canvasElement);
  }

  // Method to handle change in tshirt type
  private initializeChangeHandler(): void {
    const tshirtType = document.getElementById('tshirttype') as HTMLSelectElement;

    if (tshirtType) {
      tshirtType.addEventListener('change', () => {
        this.selectedCustomImage = './content/images/' + tshirtType.value;
        // this.selectedCustomImageBack = this.getBackImageName(this.selectedCustomImage);
      });
    }
  }

  // Method to get the back image name based on front image
  private getBackImageName(frontImage: string): string {
    return frontImage.replace('front', 'back');
  }

  private initTshirtTypeChange() {
    const tshirtType = this.tshirtType.nativeElement;

    this.renderer.listen(tshirtType, 'change', event => {
      this.loadCustomImage(event);
    });
  }
}

import { Component, OnInit, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common'; 
import { ChatService } from '../../services/chat';
import { ChatMessage, ApiResponse } from '../../models/chat.model';


@Component({
  selector: 'app-chat',
  imports: [FormsModule, CommonModule],
  templateUrl: './chat.html',
  styleUrl: './chat.css'
})
export class Chat implements OnInit, AfterViewChecked {

  @ViewChild('messageContainer') private messageContainer!: ElementRef;

  messages: ChatMessage[] = [];
  newMessage: string = '';
  isLoading: boolean = false;

  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    // Add an initial welcome message from the bot
    this.messages.push({
      sender: 'bot',
      apiResponse: {
        explanation: "Hello! I'm your mobile shopping assistant. How can I help you find the perfect phone today? Try asking 'Best camera phone under ₹30k' or 'Compare Pixel 8a vs OnePlus 12R'.",
        action: 'general_query',
        data: [],
        is_safe: true
      }
    });
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  sendMessage(): void {
    if (this.newMessage.trim() === '') {
      return;
    }

    // 1. Add user's message to the display
    this.messages.push({ sender: 'user', text: this.newMessage });
    const userQuery = this.newMessage;
    this.newMessage = ''; // Clear the input field
    this.isLoading = true;
    this.scrollToBottom();

    // 2. Call the service
    this.chatService.sendMessage(userQuery).subscribe({
      next: (response: ApiResponse) => {
        // 3. Add bot's response to the display
        this.messages.push({ sender: 'bot', apiResponse: response });
        this.isLoading = false;
        this.scrollToBottom();
      },
      error: (err) => {
        // Handle potential errors (e.g., backend is down)
        const errorResponse: ApiResponse = {
          explanation: "Sorry, I'm having trouble connecting to my brain right now. Please make sure the backend server is running and try again.",
          action: 'refusal',
          data: [],
          is_safe: false
        };
        this.messages.push({ sender: 'bot', apiResponse: errorResponse });
        this.isLoading = false;
        this.scrollToBottom();
      }
    });
  }

  formatExplanation(explanation: string): string {
    return explanation.replace(/\n/g, '<br>');
  }

  private scrollToBottom(): void {
    try {
      this.messageContainer.nativeElement.scrollTop = this.messageContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }
}